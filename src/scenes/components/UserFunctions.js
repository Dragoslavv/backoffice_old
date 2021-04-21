
export const login = (username,password,number) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "username="+ username + "&password="+ password + "&number="+ number,
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const verify_number = (verify_token, number, pin) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "verify_token="+ verify_token + "&number="+ number + "&pin="+ pin,
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const logout = () => {
    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    }).then((response) =>
        response.json()
    ).then((data) => {
        return data;
    }).catch(function (err) {
        return err;
    });
};

export const readUsers = (filter='') => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "filter="+ filter ,
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const readUsersById = (id) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "id="+ id ,
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const createUsers = (username,password,role,firstName,lastName,email,phone) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "username="+ username +"&password="+password+"&role="+ role + "&firstName="+firstName+"&lastName="+lastName+"&email="+email+"&phone="+phone,
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const deleteUsers = (id) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "id="+ id ,
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const updateUsers = (update) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "update="+ update ,
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const billingCustomerSearch = (search) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "filter="+ search ,
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const activate_subscription = (user_id, user_type, users_plan, role, bilId) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "user_id="+ user_id  + "&user_type=" + user_type + "&users_plan=" + users_plan + "&role=" + role  + "&billing_id=" + bilId,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const transactionWallet = (userId,role) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "userId="+ userId  + "&role=" + role ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const phoneNumbers = (userId) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "userId="+ userId ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const addCredit = (billing_id, amount, account, password, info, username) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "billing_id="+ billing_id + "&amount="+ amount + "&account="+ account + "&password="+ password +"&info="+ info +"&username="+ username,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const activate_package = (user_id, role, checked_duration, duration, package_id , email, auto_renew, username) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "user_id="+ user_id + "&role="+ role + "&checked_duration="+ checked_duration + "&duration="+ duration +"&package_id="+ package_id+"&email="+ email +"&auto_renew="+ auto_renew  +"&username="+ username,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const addReplaceTransfer = (user_id, number, action, role) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "user_id="+ user_id + "&number="+ number + "&action="+ action + "&role="+ role,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const activationAndDeactivation = (active, user_id, password, username) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "active="+ active + "&user_id="+ user_id + "&password="+ password + "&username="+ username ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const packageBilling = (user_id) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "user_id=" + user_id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const distPack = () => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const distDuration = () => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const simDetails = (user_id) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "user_id=" + user_id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const cdrInbound = (user_id) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "user_id=" + user_id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const cdrOutbound = (number) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "number=" + number ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const Device = (user_id) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "user_id=" + user_id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const CustomerPaymentApi = (billing_id) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "billing_id=" + billing_id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const ChargeLogTrans = (billing_id,start_log,end_log,type_log) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "billing_id=" + billing_id + "&start_log=" + start_log + "&end_log=" + end_log + "&type_log=" + type_log,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const ChargeDataLogDb = (billing_id,start_log,end_log,type_log) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "billing_id=" + billing_id + "&start_log=" + start_log + "&end_log=" + end_log + "&type_log=" + type_log,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const PaymentTransactionsTotal = (start_log,end_log) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_log=" + start_log + "&end_log=" + end_log,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const PaymentTransactionsTable = (start_log,end_log,type='') => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_log=" + start_log + "&end_log=" + end_log + "&type=" + type,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const StatisticReadGrid = (start_day,end_day,end = '') => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_day=" + start_day + "&end_day=" + end_day + "&end=" + end,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const StatisticReadChartDaily = (start_day,end_day) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_day=" + start_day + "&end_day=" + end_day ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const StatisticReadChartHourly = (end_day) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "end_day=" + end_day ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const TotalPaymentChart = (start_day,end_day) => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_day=" + start_day + "&end_day=" + end_day ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const paymentOrders = (start_log, end_log, user_id = '', payment_status = '', payment_type = '', order_type = '', account_id = '') => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_log=" + start_log + "&end_log=" + end_log + "&user_id=" + user_id + "&payment_status=" + payment_status + "&payment_type=" + payment_type + "&order_type=" + order_type + "&account_id=" + account_id,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const TopUpTransactions = (start_log, end_log, consumerId = '', transactionId = '', topUp_status = '') => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_log=" + start_log + "&end_log=" + end_log + "&consumerId=" + consumerId + "&transactionId=" + transactionId + "&topUp_status=" + topUp_status,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const CardTransactionsCall = (start_log, end_log, cardStatus = '', userId = '') => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_log=" + start_log + "&end_log=" + end_log + "&state=" + cardStatus + "&user_id=" + userId,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const iPayTransaction = (start_log, end_log, iPayStatus = '', userId = '', transfer_type = '') => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_log=" + start_log + "&end_log=" + end_log + "&state=" + iPayStatus + "&user_id=" + userId + "&transfer_type=" + transfer_type,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};


export const CdrDailyStatistic = (day, account_code_name = '', type = '', inType = '') => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "day=" + day + "&account_code_name=" + account_code_name + "&type=" + type + "&inType=" + inType,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const CdrHourlyStatistic = (start, end , account_code_name = '', type = '', inType = '') => {

    return fetch("url",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start=" + start + "&end=" + end + "&account_code_name=" + account_code_name + "&type=" + type + "&inType=" + inType,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};
