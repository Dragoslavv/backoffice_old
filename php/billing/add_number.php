<?php

error_reporting(0);

require_once("../../lib/php/common2.php");

foreach ($_POST as $key => $value)
{
    ${$DB->escape($key)} = $DB->escape($value);
}

if ( !$user_id || $_SESSION['USERDATA']["role"]=='USER')
{
    $response['success'] = false;
    echo json_encode($response);
    exit;
}

if(!$msisdn || !$action )
{
    $response['success'] = false;
    echo json_encode($response);
    exit;
}

$msisdn_check =  $DB->sfetch("SELECT count(*) from vs_numbers where number = $msisdn");
$msisdn_check_mb = $DB->sfetch("SELECT count(*) from mb_sim where msisdn = $msisdn");


if($msisdn_check> 0 || $msisdn_check_mb>0 ){

    $response['success'] = true;
    $response['message'] = 'Error! Number '.$msisdn.' is taken.';
    echo json_encode($response);
    exit;
}


$msisdn_old_check =  $DB->sfetch("SELECT RTRIM(email, '@globaltel.rs') from vs_users where id = $user_id");
$active_sim =  $DB->sfetch("SELECT activation_time from mb_sim where msisdn = $msisdn_old and activation_time is not null");

if(!$active_sim){
    $active_sim= 0;
}else{
    $active_sim= 1;
}


/*if ($msisdn_old != $msisdn_old_check)
{
    $response['success'] = true;
    $response['message'] = 'Error! Number '.$msisdn.' is not sim.';
    echo json_encode($response);
    exit;
}*/


/*if(substr($msisdn_old, 0, 6) !== '381677' ){

    $response['success'] = true;
    $response['message'] = 'Error! Number '.$msisdn_old.' is not globaltel.';
    echo json_encode($response);
    exit;
}*/



//ukoliko postoji user sa istim brojem koji hoce da se prebaci u nasu mrezu brise se iz users tabele i numbers tabele 
function check_when_transfer($number, $action){
     global $DB;

    $email = $number.'@globaltel.rs';
    $comment_action = '.gui-'.$action;

    $email_check =  $DB->sfetch("SELECT count(*) from vs_users where email = '$email'");
    if($email_check>0){

        $user_history = "INSERT INTO vs_users_history SELECT id, email, password, created, brand, billing_id, active, user_type, first_name, last_name, alternative_email, verification_email, url_image, daylight_saving_time, utc_time_zone, last_seen, online_visible, lang, '$comment_action' from vs_users where email = $email ";
        $DB->query($user_history);
        $user_delete = "DELETE vs_users where email = $email";
        $DB->query($user_delete);

        $number_history = "INSERT INTO vs_numbers_history (user_id, number, status, type, expiration_date, auto_renew, created, id, provider, price_input, price_output, brand, color, sms_support,  autorenew_time, autorenew_retry) SELECT user_id, number, status, type, expiration_date, auto_renew, created, id, provider, price_input, price_output, brand, color, sms_support,  autorenew_time, autorenew_retry from vs_numbers where number = $number ";
        $DB->query($number_history);
        $number_delete = "DELETE vs_numbers where number = $number";
        $DB->query($number_delete);

    }

}

//radi se update broja koji je searchovan sa brojem koji je poslat, kada se radi zamena i transfer broja

function update($id, $number, $active_sim, $action, $msisdn_old ){
    global $DB;

    $email = $number.'@globaltel.rs';
    $comment_action = '.gui-'.$action;

    $user_history = "INSERT INTO vs_users_history SELECT id, email, password, created, brand, billing_id, active, user_type, first_name, last_name, alternative_email, verification_email, url_image, daylight_saving_time, utc_time_zone, last_seen, online_visible, lang, '$comment_action' from vs_users where id = $id ";
    $DB->query($user_history);

    $user_update = "UPDATE vs_users set email = '$email' where id = $id ";
    $DB->query($user_update);
    $affected_rows = $DB->affected_rows();
    //exit;

    if ($affected_rows > 0)
            {
                    $number_history = "INSERT INTO vs_numbers_history (user_id, number, status, type, expiration_date, auto_renew, created, id, provider, price_input, price_output, brand, color, sms_support,  autorenew_time, autorenew_retry) SELECT user_id, number, status, type, expiration_date, auto_renew, created, id, provider, price_input, price_output, brand, color, sms_support,  autorenew_time, autorenew_retry from vs_numbers where number = $msisdn_old ";
                    $DB->query($number_history);

                if($action=='replace'){

                if(substr($number, 0, 6) !== '381677' ){

                    $response['success'] = true;
                    $response['message'] = 'Error! Number '.$number.' is ok.';
                    echo json_encode($response);
                    exit;
                }

                     $specialnumber_update = "UPDATE vs_special_offer_numbers set reserved = 1 where number = $number ";
                    $DB->query($specialnumber_update);

                    $number_update = "UPDATE vs_numbers set number = $number where number = $msisdn_old and user_id = $id ";
                    $DB->query($number_update);
                     $mbsim_update = "UPDATE mb_sim set msisdn = $number where msisdn = $msisdn_old";
                        $DB->query($mbsim_update);
                        $affected_rows = $DB->affected_rows();
                    
                }else{

                
                    $number_update = "UPDATE vs_numbers set number = $number, port_type = 2 where number = $msisdn_old and user_id = $id ";
                    $DB->query($number_update);
                     $mbsim_update = "UPDATE mb_sim set msisdn = $number, ported = 2 where msisdn = $msisdn_old";
                        $DB->query($mbsim_update);
                    $affected_rows = $DB->affected_rows();

                }

               
                       
                    if ($affected_rows <= 0)
                        { 
                            
                            $response['success'] = false;
                            $response['sql'] = $mbsim_update;
                            echo json_encode($response);
                            exit;
                            
                        }
                    if($affected_rows > 0 &&  $active_sim == 0){

                       /* $sql_insert = "INSERT INTO vs_callcentar_log (operator, user_id, action, package_id) values ('$operator_name', $id, '$action',$number) ";

                        $DB->query($sql_insert);*/
                        

                        $response['success'] = true;
                        $response['number_history'] = $number_history;
                        $response['message'] = 'Success! Number: '.$msisdn.' is succesfully '.$action.'ed .';
                        echo json_encode($response);
                        exit;
                   

                    } 

                    /*    
                    }
                    else
                    {
                        $response['success'] = false;
                        $response['sql'] = $number_update;
                        echo json_encode($response);
                        exit;
                    }
                */
            }
            else
            {
                $response['success'] = false;
                $response['sql'] = $user_update;
                echo json_encode($response);
                exit;
            }
}

function add_number($id, $number, $action){
    global $DB;

    $number_add = "INSERT INTO vs_numbers (user_id, number, status, type, expiration_date, auto_renew, provider, price_input, price_output, brand, color, sms_support, port_type) values ($id, '$number', 1, 'real', '20138-01-19 00:00:00',TRUE, 'procescom', 0.0, 0.0, 'globaltel', 5, FALSE, 1) ";
    /*print_r($number_add);
    exit;*/
    $DB->query($number_add);
    $affected_rows = $DB->affected_rows();

    if ($affected_rows > 0)
        {
           /*$sql_insert = "INSERT INTO vs_callcentar_log (operator, user_id, action, package_id) values ('$operator_name', $id, '$action',$number) ";

            $DB->query($sql_insert);*/

            $specialnumber_update = "UPDATE vs_special_offer_numbers set reserved = 1 where number = $number ";
            $DB->query($specialnumber_update);
            $response['success'] = true;
            $response['message'] = 'Success! Number: '.$msisdn.' is succesfully added.';
            echo json_encode($response);
            exit;
       
        }
        else
        {
            $response['success'] = false;
            $response['sql'] = $sql;
            echo json_encode($response);
            exit;
        }
}

function mb_hvr($number, $msisdn){
    global $DB;

    $mbhvr = "UPDATE mb_hvr SET msisdn = $number where msisdn = $msisdn ";
    $DB->query($mbhvr);
    $affected_rows = $DB->affected_rows();
    if ($affected_rows <= 0)
        { 
            $response['success'] = false;
            $response['sql'] = $sql;
            echo json_encode($response);
            exit;
            
        }

}

function device_registered($id){
    global $DB;

    $device = "UPDATE vs_device SET registered = FALSE where id = $id ";
    $DB->query($device);
    /*$affected_rows = $DB->affected_rows();
    if ($affected_rows <= 0)
        { 
            $response['success'] = false;
            $response['sql'] = $sql;
            echo json_encode($response);
            exit;
            
        }*/

}

function mb_hvr_cancel($id, $number, $action, $BILLING_IP){
    global $DB;

    
    $json = `curl  http://$BILLING_IP:5592/cancel=$number`;
  

    if ($json[12]!== '0')
    {
         $response['success'] = true;
        $response['message'] = 'Error! ';
        $response['result'] = $json;
        echo json_encode($response);
        exit;
       
    }else{

      
        $specialnumber_update = "UPDATE vs_special_offer_numbers set reserved = 1 where number = $number ";
        $DB->query($specialnumber_update);

        $response['success'] = true;
        $response['message'] = 'Success! Number: '.$msisdn.' is succesfully replaced.';
        echo json_encode($response);
        exit;

    }


}

if($action == 'replace'){

    update($user_id, $msisdn, $active_sim, $action, $msisdn_old );
    if( $active_sim == 1 ){
        mb_hvr($msisdn, $msisdn_old);
        device_registered($user_id);
        mb_hvr_cancel($user_id,$msisdn, $action, $BILLING_IP);
    }

}elseif ($action == 'transfer') {

    //check_when_transfer($msisdn, $action);
    update($user_id, $msisdn,  $active_sim, $action, $msisdn_old );
    if( $active_sim == 1 ){
        mb_hvr($msisdn, $msisdn_old);
        device_registered($user_id);
        mb_hvr_cancel($user_id,$msisdn, $action, $BILLING_IP);
    }
    # code...
}elseif($action == 'add'){
    add_number($user_id, $msisdn, $action);

}



