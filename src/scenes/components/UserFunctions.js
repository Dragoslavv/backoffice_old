
export const login = (username,password,number) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=login",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=verify_number",{
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
    return fetch("https://api.globaltel.rs/new-gui/?url=logout",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=read",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=readById",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=create",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=destroy",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=update",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=user",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=activate_subscription",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=transaction_wallet",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=phone_numbers",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=add_credit",{
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

export const addReplaceTransfer = (user_id, number, action, role) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=add_number",{
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

export const activationAndDeactivation = (active, user_id, password) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=deactivation",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "active="+ active + "&user_id="+ user_id + "&password="+ password ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const packageBilling = (user_id) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=package-billing",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=distPack",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=distDuration",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=number_sim",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=cdr_inbound",{
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

export const cdrOutbound = (user_id) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=cdr_outhbound",{
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

export const Device = (user_id) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=devices",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=chargelog",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=charge_log_trans",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=charge_data_log",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=total-payment",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=payment",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=read-grid",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=read-payment-chart-daily",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=read-payment-chart-hourly",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=total-chart",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=orders",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=topUp-read",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=card-read",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=ipay-read",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=read-stat-daily",{
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

    return fetch("https://api.globaltel.rs/new-gui/?url=read-stat-hourly",{
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

export const MessagingHourly = (day, direction = '' , brand = '', messaging_type = '') => {

    return fetch("https://api.globaltel.rs/new-gui/?url=read-messaging-hourly",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "day=" + day + "&direction=" + direction + "&brand=" + brand + "&type=" + messaging_type,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const MessagingDaily = (start, end, direction = '' , brand = '', messaging_type = '') => {

    return fetch("https://api.globaltel.rs/new-gui/?url=read-messaging-daily",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start=" + start + "&end=" + end + "&direction=" + direction + "&brand=" + brand + "&type=" + messaging_type,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};


export const totalNumbers = (start_day, end_day) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=total-spof-number",{
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


export const statNumbers = (start_day, end_day) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=stat-spof-number",{
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


export const country = () => {

    return fetch("https://api.globaltel.rs/new-gui/?url=country",{
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


export const addRoutes = (name, host, active, inbound, outbound, id = '') => {

    return fetch("https://api.globaltel.rs/new-gui/?url=add-routes",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "name=" + name + "&host=" + host + "&active=" + active + "&inbound=" + inbound + "&outbound=" + outbound + "&id=" + id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const updateRoutes = (record) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=update-routes",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "record=" + record ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};


export const RatesUpdate = (role, perminutecost, id) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=update_rates",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "role=" + role + "&perminutecost=" + perminutecost + "&id=" + id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const ParkingStatistic = (start, end, zone) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=parking_statistic",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_day=" + start + "&end_day=" + end + "&zone=" + zone ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const PackagesStatistic = (start, end, package_id, package_group_id, free_of_charge, route) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=packages_stat",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start_day=" + start + "&end_day=" + end + "&package_id=" + package_id + "&package_group_id=" + package_group_id + "&free_of_charge=" + free_of_charge + "&route=" + route ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};


export const distinctdield = () => {

    return fetch("https://api.globaltel.rs/new-gui/?url=distinctdield",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const distinctfield_display = () => {

    return fetch("https://api.globaltel.rs/new-gui/?url=distinctfield_display",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const addNewPackages = (record) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=create_package",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "record=" + record,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const editPackages = (promotionId, record) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=edit_packages",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "promotionId=" + promotionId + "&record=" + record,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const destroyPackages = (promotionId) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=destroy_package",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "promotionId=" + promotionId ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const copyPackage = (id) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=copy_package",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "id=" + id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};











/***   System Message  ***/

export const distFieldVsBrand = () => {

    return fetch("https://api.globaltel.rs/new-gui/?url=dist_fied_vs_brand",{
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


export const distFieldVsText = () => {

    return fetch("https://api.globaltel.rs/new-gui/?url=dist_field_vs_text",{
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

export const updateSyMessage = (id, record) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=update_message",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "id=" + id + '&record=' + record,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const destroySyMessage = (id) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=destroy_message",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "id=" + id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const createSyMessage = (key_gui, value_gui, lang, script) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=create_message",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "key_gui=" + key_gui + "&value_gui=" + value_gui + "&lang="+ lang + "&script=" + script ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const total_daily_mastercard = (start, end) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=total_master",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start=" + start + "&end=" + end ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const statistic_daily_master = (start, end) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=statistic_daily_master",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start=" + start + "&end=" + end ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const total_hourly_mastercard = (date) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=total_hourly_master",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "date=" + date,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const statistic_hourly_master = (date) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=statistic_hourly_master",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "date=" + date,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const data_usage = (start, end) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=data_usage",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start=" + start + "&end=" + end,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const active_users = (start, end) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=active_users",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start=" + start + "&end=" + end,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const sim_hourly = (date) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=sim_hourly",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "date=" + date ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const sim_daily = (start, end, code) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=sim_daily",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "start=" + start + "&end=" + end + "&code=" + code,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};

export const promo_view = (id) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=promotion_view",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "promo_id=" + id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};


/***  Most common cases **/

export const read_shopping_cart_id = (cart_id) => {

    return fetch("https://api.globaltel.rs/new-gui/?url=read_shopping_cart_id",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "cart_id=" + cart_id ,

    }).then((response) =>
        response.json()
    ).then((data) => {

        return data;

    }).catch(function (err) {
        return err;
    });
};