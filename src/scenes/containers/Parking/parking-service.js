import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {ParkingServiceTotalTable} from "../../components/Table/parking-service-total-table";
import {ParkingRequestTable} from "../../components/Table/parking-request-table";
import {ParkingResponseTable} from "../../components/Table/parking-response-table";
import {ParkingTotal} from "../../components/UserFunctions";
import {Redirect} from "react-router-dom";

class ParkingService extends Component {
    constructor(props){
        super(props);


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.state = {
            redirect: false,
            request:true,
            response:false,
            start_log: today + 'T00:00',
            end_log: today + 'T23:59:59',
            zone: '',
            user_number:'',
            search:''
        };

        this.parkingRequest = this.parkingRequest.bind(this);
        this.parkingResponse = this.parkingResponse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sessionGet = this.sessionGet.bind(this);
        this.handleReset = this.handleReset.bind(this);

    }

    handleClick = (e) => {
        e.preventDefault();

        if(e.target.id === 'parking_click'){

            this.setState({
                search:'click'
            });

        }
    };

    handleReset = (e) => {
        e.preventDefault();
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.setState( {
            redirect: false,
            request:true,
            response:false,
            start_log: today + 'T00:00',
            end_log: today + 'T23:59:59',
            zone: '',
            user_number:'',
            search:'click'
        });
    };

    handleChange = (e) => {
        e.preventDefault();

        this.setState({
            [e.target.name] : e.target.value
        })
    };

    parkingRequest() {
        this.setState({
            request:!this.state.request,
            response:false
        });
    }

    parkingResponse() {
        this.setState({
            response:!this.state.response,
            request:false
        });
    }

    sessionGet = (key) => {
        let stringValue = window.sessionStorage.getItem(key);
        if (stringValue !== null) {
            let value = JSON.parse(stringValue);
            let expirationDate = new Date(value.expirationDate);
            if (expirationDate > new Date()) {
                return value.value
            } else {
                window.sessionStorage.removeItem(key);
                sessionStorage.setItem('billing_active','');
                sessionStorage.setItem('billing_balances','');
                sessionStorage.setItem('billing_id','');
                sessionStorage.setItem('billing_brand','');
                sessionStorage.setItem('billing_created','');
                sessionStorage.setItem('billing_email','');
                sessionStorage.setItem('billing_force_app','');
                sessionStorage.setItem('billing_name','');
                sessionStorage.setItem('billing_reservations','');
                sessionStorage.setItem('billing_user_id','');
                sessionStorage.setItem('billing_user_type','');
                sessionStorage.setItem('billing_wallet_id','');

                sessionStorage.setItem('number','');
                sessionStorage.setItem('email','');
                sessionStorage.setItem('userId','');
                sessionStorage.setItem('billingId','');

                sessionStorage.removeItem('number');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('billingId');

                sessionStorage.removeItem('billing_active');
                sessionStorage.removeItem('billing_balances');
                sessionStorage.removeItem('billing_id');
                sessionStorage.removeItem('billing_brand');
                sessionStorage.removeItem('billing_created');
                sessionStorage.removeItem('billing_email');
                sessionStorage.removeItem('billing_force_app');
                sessionStorage.removeItem('billing_name');
                sessionStorage.removeItem('billing_reservations');
                sessionStorage.removeItem('billing_user_id');
                sessionStorage.removeItem('billing_user_type');
                sessionStorage.removeItem('billing_wallet_id');
            }
        }
        return null
    };

    componentWillMount() {
        if(this.sessionGet('token')){
            console.log('Call User Feed');
        } else {
            this.setState({
                redirect:true
            });
        }
    }

    render() {

        if(this.state.redirect){
            return <Redirect to={'/'} />
        }

        return (
            <div id="wrapper" className={ localStorage.getItem('active') === true ? "toggled" :"" }>
                <section id="content-wrapper" >
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb head-pages wrap-border">
                            <li className="breadcrumb-item"><Link to="/customer-billing">GLOBALTELGUI</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Parking Service</li>
                        </ol>
                    </nav>
                    <div className="row mb-3">
                        <div className="col-lg-3">
                            <div className='wrap-border table-col-gui' >
                                <h6 className='content-title'>Parking Search</h6>
                                <hr/>
                                <form method="post">
                                    <div className='form-group'>
                                        <input className='input' type='datetime-local' name='start_log' value={this.state.start_log} onChange={this.handleChange} autoComplete='off' placeholder='Start:'/>
                                    </div>
                                    <div className='form-group'>
                                        <input className='input' type='datetime-local' name='end_log' value={this.state.end_log} onChange={this.handleChange} autoComplete='off' placeholder='End:'/>

                                    </div>
                                    <div className='form-group'>
                                        <select className="input " name="zone" value={this.state.zone} onChange={this.handleChange}>
                                            <option value="">ALL</option>
                                            <option value="1000">1000</option>
                                            <option value="1018">1018</option>
                                            <option value="1021">1021</option>
                                            <option value="1030">1030</option>
                                            <option value="1037">1037</option>
                                            <option value="1040">1040</option>
                                            <option value="1044">1044</option>
                                            <option value="1055">1055</option>
                                            <option value="1060">1060</option>
                                            <option value="1077">1077</option>
                                            <option value="1088">1088</option>
                                            <option value="1099">1099</option>
                                            <option value="1122">1122</option>
                                            <option value="1123">1123</option>
                                            <option value="1201">1201</option>
                                            <option value="1202">1202</option>
                                            <option value="1212">1212</option>
                                            <option value="1240">1240</option>
                                            <option value="1246">1246</option>
                                            <option value="1290">1290</option>
                                            <option value="1294">1294</option>
                                            <option value="1298">1298</option>
                                            <option value="1310">1310</option>
                                            <option value="1311">1311</option>
                                            <option value="1313">1313</option>
                                            <option value="1360">1360</option>
                                            <option value="1441">1441</option>
                                            <option value="1500">1500</option>
                                            <option value="1505">1505</option>
                                            <option value="1550">1550</option>
                                            <option value="1551">1551</option>
                                            <option value="1552">1552</option>
                                            <option value="1553">1553</option>
                                            <option value="1554">1554</option>
                                            <option value="1555">1555</option>
                                            <option value="1556">1556</option>
                                            <option value="1557">1557</option>
                                            <option value="1599">1599</option>
                                            <option value="1617">1617</option>
                                            <option value="1630">1630</option>
                                            <option value="1660">1660</option>
                                            <option value="1661">1661</option>
                                            <option value="1662">1662</option>
                                            <option value="1665">1665</option>
                                            <option value="1666">1666</option>
                                            <option value="1668">1668</option>
                                            <option value="1669">1669</option>
                                            <option value="1784">1784</option>
                                            <option value="1818">1818</option>
                                            <option value="1881">1881</option>
                                            <option value="1987">1987</option>
                                            <option value="2002">2002</option>
                                            <option value="2019">2019</option>
                                            <option value="2100">2100</option>
                                            <option value="2125">2125</option>
                                            <option value="2229">2229</option>
                                            <option value="2233">2233</option>
                                            <option value="2244">2244</option>
                                            <option value="2322">2322</option>
                                            <option value="2323">2323</option>
                                            <option value="2324">2344</option>
                                            <option value="2345">2345</option>
                                            <option value="2377">2377</option>
                                            <option value="2399">2399</option>
                                            <option value="2772">2772</option>
                                            <option value="2778">2778</option>
                                            <option value="3010">3010</option>
                                            <option value="3030">3030</option>
                                            <option value="3113">3113</option>
                                            <option value="3222">3222</option>
                                            <option value="3303">3303</option>
                                            <option value="3311">3311</option>
                                            <option value="3322">3322</option>
                                            <option value="3334">3334</option>
                                            <option value="3336">3336</option>
                                            <option value="3339">3339</option>
                                            <option value="3340">3340</option>
                                            <option value="3344">3344</option>
                                            <option value="3355">3355</option>
                                            <option value="3363">3363</option>
                                            <option value="3386">3386</option>
                                            <option value="3399">3399</option>
                                            <option value="3424">3424</option>
                                            <option value="3500">3500</option>
                                            <option value="3501">3501</option>
                                            <option value="3502">3502</option>
                                            <option value="3535">3535</option>
                                            <option value="3555">3555</option>
                                            <option value="3611">3611</option>
                                            <option value="3636">3636</option>
                                            <option value="3737">3737</option>
                                            <option value="4010">4010</option>
                                            <option value="4011">4011</option>
                                            <option value="4014">4014</option>
                                            <option value="4025">4025</option>
                                            <option value="4040">4040</option>
                                            <option value="4100">4100</option>
                                            <option value="4130">4130</option>
                                            <option value="4161">4161</option>
                                            <option value="4224">4224</option>
                                            <option value="4345">4345</option>
                                            <option value="4346">4346</option>
                                            <option value="4353">4353</option>
                                            <option value="4355">4355</option>
                                            <option value="4400">4400</option>
                                            <option value="4402">4402</option>
                                            <option value="4404">4404</option>
                                            <option value="4405">4405</option>
                                            <option value="4407">4407</option>
                                            <option value="4411">4411</option>
                                            <option value="4433">4433</option>
                                            <option value="4455">4455</option>
                                            <option value="4466">4466</option>
                                            <option value="4477">4477</option>
                                            <option value="4492">4492</option>
                                            <option value="4499">4499</option>
                                            <option value="4500">4500</option>
                                            <option value="4505">4505</option>
                                            <option value="4545">4545</option>
                                            <option value="4555">4555</option>
                                            <option value="4558">4558</option>
                                            <option value="4567">4567</option>
                                            <option value="4640">4640</option>
                                            <option value="4567">4567</option>
                                            <option value="4822">4822</option>
                                            <option value="5005">5005</option>
                                            <option value="5006">5006</option>
                                            <option value="5060">5060</option>
                                            <option value="5200">5200</option>
                                            <option value="5202">5202</option>
                                            <option value="5222">5222</option>
                                            <option value="5223">5223</option>
                                            <option value="5224">5224</option>
                                            <option value="5225">5225</option>
                                            <option value="5232">5232</option>
                                            <option value="5240">5240</option>
                                            <option value="5331">5331</option>
                                            <option value="5332">5332</option>
                                            <option value="5445">5445</option>
                                            <option value="5500">5500</option>
                                            <option value="5505">5505</option>
                                            <option value="5511">5511</option>
                                            <option value="5544">5544</option>
                                            <option value="5544">5544</option>
                                            <option value="5550">5550</option>
                                            <option value="5556">5556</option>
                                            <option value="5557">5557</option>
                                            <option value="5566">5566</option>
                                            <option value="5577">5577</option>
                                            <option value="5580">5580</option>
                                            <option value="5622">5622</option>
                                            <option value="5881">5881</option>
                                            <option value="5885">5885</option>
                                            <option value="5886">5886</option>
                                            <option value="5887">5887</option>
                                            <option value="5889">5889</option>
                                            <option value="6000">6000</option>
                                            <option value="6006">6006</option>
                                            <option value="6060">6060</option>
                                            <option value="6204">6204</option>
                                            <option value="6212">6212</option>
                                            <option value="6218">6218</option>
                                            <option value="6222">6222</option>
                                            <option value="6230">6230</option>
                                            <option value="6236">6236</option>
                                            <option value="6252">6252</option>
                                            <option value="6262">6262</option>
                                            <option value="6263">6263</option>
                                            <option value="6264">6264</option>
                                            <option value="6265">6265</option>
                                            <option value="6267">6267</option>
                                            <option value="6274">6274</option>
                                            <option value="6288">6288</option>
                                            <option value="6292">6292</option>
                                            <option value="6310">6310</option>
                                            <option value="6336">6336</option>
                                            <option value="6555">6555</option>
                                            <option value="6556">6556</option>
                                            <option value="6600">6600</option>
                                            <option value="6624">6624</option>
                                            <option value="6633">6633</option>
                                            <option value="6688">6688</option>
                                            <option value="669">669</option>
                                            <option value="6699">6699</option>
                                            <option value="6969">6969</option>
                                            <option value="7006">7006</option>
                                            <option value="7007">7007</option>
                                            <option value="7008">7008</option>
                                            <option value="7039">7039</option>
                                            <option value="7070">7070</option>
                                            <option value="7117">7117</option>
                                            <option value="7131">7131</option>
                                            <option value="7132">7132</option>
                                            <option value="7133">7133</option>
                                            <option value="7134">7134</option>
                                            <option value="7272">7272</option>
                                            <option value="7370">7370</option>
                                            <option value="7371">7371</option>
                                            <option value="7777">7777</option>
                                            <option value="7979">7979</option>
                                            <option value="8080">8080</option>
                                            <option value="8110">8110</option>
                                            <option value="8115">8115</option>
                                            <option value="8116">8116</option>
                                            <option value="8117">8117</option>
                                            <option value="8120">8120</option>
                                            <option value="8121">8121</option>
                                            <option value="8122">8122</option>
                                            <option value="8123">8123</option>
                                            <option value="8131">8131</option>
                                            <option value="8132">8132</option>
                                            <option value="8133">8133</option>
                                            <option value="8134">8134</option>
                                            <option value="8141">8141</option>
                                            <option value="8142">8142</option>
                                            <option value="8160">8160</option>
                                            <option value="8161">8161</option>
                                            <option value="8162">8162</option>
                                            <option value="8191">8191</option>
                                            <option value="8192">8192</option>
                                            <option value="8193">8193</option>
                                            <option value="8193">8201</option>
                                            <option value="8193">8202</option>
                                            <option value="8193">8211</option>
                                            <option value="8193">8212</option>
                                            <option value="8193">8213</option>
                                            <option value="8193">8214</option>
                                            <option value="8193">8215</option>
                                            <option value="8193">8216</option>
                                            <option value="8193">8217</option>
                                            <option value="8193">8218</option>
                                            <option value="8193">8219</option>
                                            <option value="8221">8221</option>
                                            <option value="8222">8222</option>
                                            <option value="8223">8223</option>
                                            <option value="8224">8224</option>
                                            <option value="8225">8225</option>
                                            <option value="8226">8226</option>
                                            <option value="8227">8227</option>
                                            <option value="8228">8228</option>
                                            <option value="8230">8230</option>
                                            <option value="8231">8231</option>
                                            <option value="8232">8232</option>
                                            <option value="8235">8235</option>
                                            <option value="8236">8236</option>
                                            <option value="8237">8237</option>
                                            <option value="8241">8241</option>
                                            <option value="8242">8242</option>
                                            <option value="8243">8243</option>
                                            <option value="8288">8288</option>
                                            <option value="8311">8311</option>
                                            <option value="8312">8312</option>
                                            <option value="8313">8313</option>
                                            <option value="8321">8321</option>
                                            <option value="8322">8322</option>
                                            <option value="8338">8338</option>
                                            <option value="8340">8340</option>
                                            <option value="8341">8341</option>
                                            <option value="8342">8342</option>
                                            <option value="8343">8343</option>
                                            <option value="8344">8344</option>
                                            <option value="8345">8345</option>
                                            <option value="8346">8346</option>
                                            <option value="8351">8351</option>
                                            <option value="8352">8352</option>
                                            <option value="8353">8353</option>
                                            <option value="8371">8371</option>
                                            <option value="8372">8372</option>
                                            <option value="8373">8373</option>
                                            <option value="8374">8374</option>
                                            <option value="8374">8420</option>
                                            <option value="8374">8421</option>
                                            <option value="8374">8422</option>
                                            <option value="8374">8423</option>
                                            <option value="8441">8441</option>
                                            <option value="8442">8442</option>
                                            <option value="8443">8443</option>
                                            <option value="8444">8444</option>
                                            <option value="8445">8445</option>
                                            <option value="8521">8521</option>
                                            <option value="8522">8522</option>
                                            <option value="8531">8531</option>
                                            <option value="8532">8532</option>
                                            <option value="8533">8533</option>
                                            <option value="8611">8611</option>
                                            <option value="8612">8612</option>
                                            <option value="8621">8621</option>
                                            <option value="8622">8622</option>
                                            <option value="8623">8623</option>
                                            <option value="8630">8630</option>
                                            <option value="8631">8631</option>
                                            <option value="8632">8632</option>
                                            <option value="8633">8633</option>
                                            <option value="8634">8634</option>
                                            <option value="8661">8661</option>
                                            <option value="8662">8662</option>
                                            <option value="8663">8663</option>
                                            <option value="8664">8664</option>
                                            <option value="8623">8731</option>
                                            <option value="8623">8732</option>
                                            <option value="8800">8800</option>
                                            <option value="8807">8807</option>
                                            <option value="8808">8808</option>
                                            <option value="8809">8809</option>
                                            <option value="8811">8811</option>
                                            <option value="8812">8812</option>
                                            <option value="8821">8821</option>
                                            <option value="8822">8822</option>
                                            <option value="8831">8831</option>
                                            <option value="8832">8832</option>
                                            <option value="8833">8833</option>
                                            <option value="8834">8834</option>
                                            <option value="9040">9040</option>
                                            <option value="9041">9041</option>
                                            <option value="9042">9042</option>
                                            <option value="9043">9043</option>
                                            <option value="9050">9050</option>
                                            <option value="9051">9051</option>
                                            <option value="9052">9052</option>
                                            <option value="9052">9052</option>
                                            <option value="9062">9062</option>
                                            <option value="9080">9080</option>
                                            <option value="9081">9081</option>
                                            <option value="9082">9082</option>
                                            <option value="9108">9108</option>
                                            <option value="9109">9109</option>
                                            <option value="9110">9110</option>
                                            <option value="9111">9111</option>
                                            <option value="9112">9112</option>
                                            <option value="9113">9113</option>
                                            <option value="9114">9114</option>
                                            <option value="9118">9118</option>
                                            <option value="9119">9119</option>
                                            <option value="9131">9131</option>
                                            <option value="9132">9132</option>
                                            <option value="9133">9133</option>
                                            <option value="9134">9134</option>
                                            <option value="9140">9140</option>
                                            <option value="9141">9141</option>
                                            <option value="9142">9142</option>
                                            <option value="9170">9170</option>
                                            <option value="9171">9171</option>
                                            <option value="9172">9172</option>
                                            <option value="9173">9173</option>
                                            <option value="9180">9180</option>
                                            <option value="9181">9181</option>
                                            <option value="9182">9182</option>
                                            <option value="9183">9183</option>
                                            <option value="9184">9184</option>
                                            <option value="9185">9185</option>
                                            <option value="9189">9189</option>
                                            <option value="9191">9191</option>
                                            <option value="9192">9192</option>
                                            <option value="9193">9193</option>
                                            <option value="9194">9194</option>
                                            <option value="9221">9221</option>
                                            <option value="9222">9222</option>
                                            <option value="9231">9231</option>
                                            <option value="9232">9232</option>
                                            <option value="9233">9233</option>
                                            <option value="9241">9241</option>
                                            <option value="9242">9242</option>
                                            <option value="9243">9243</option>
                                            <option value="9244">9244</option>
                                            <option value="9245">9245</option>
                                            <option value="9246">9246</option>
                                            <option value="9250">9250</option>
                                            <option value="9251">9251</option>
                                            <option value="9252">9252</option>
                                            <option value="9253">9253</option>
                                            <option value="9255">9255</option>
                                            <option value="9270">9270</option>
                                            <option value="9271">9271</option>
                                            <option value="9280">9280</option>
                                            <option value="9281">9281</option>
                                            <option value="9282">9282</option>
                                            <option value="9292">9292</option>
                                            <option value="9341">9341</option>
                                            <option value="9342">9342</option>
                                            <option value="9343">9343</option>
                                            <option value="9344">9344</option>
                                            <option value="9345">9345</option>
                                            <option value="9390">9390</option>
                                            <option value="9391">9391</option>
                                            <option value="9392">9392</option>
                                            <option value="9393">9393</option>
                                            <option value="9394">9394</option>
                                            <option value="9461">9461</option>
                                            <option value="9462">9462</option>
                                            <option value="9463">9463</option>
                                            <option value="9630">9630</option>
                                            <option value="9631">9631</option>
                                            <option value="9632">9632</option>
                                            <option value="9633">9633</option>
                                            <option value="9634">9634</option>
                                            <option value="9656">9656</option>
                                            <option value="9700">9700</option>
                                            <option value="9720">9720</option>
                                            <option value="9721">9721</option>
                                            <option value="9722">9722</option>
                                            <option value="9723">9723</option>
                                            <option value="9724">9724</option>
                                            <option value="9725">9725</option>
                                            <option value="9870">9870</option>
                                            <option value="9871">9871</option>
                                            <option value="9872">9872</option>
                                            <option value="9991">9991</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <input className='input' type='text' autoComplete='off' name='user_number' value={this.state.user_number} onChange={this.handleChange}  placeholder='User Number'/>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-info" onClick={this.handleReset} type="submit">Reset</button>
                                            </div>
                                            <div className="col-lg-6">
                                                <button className="btn btn-block btn-outline-success" id='parking_click' onClick={this.handleClick} type="submit">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className='wrap-border table-col-gui'>
                                <h6 className='content-title'>Total</h6>
                                <hr/>
                                <ParkingServiceTotalTable search={this.state.search} data={{
                                    start_log: this.state.start_log,
                                    end_log: this.state.end_log,
                                    zone: this.state.zone,
                                    user_number: this.state.user_number
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-6">
                            <button type='submit' onClick={this.parkingRequest} className="btn btn-block btn-danger">Parking Request</button>
                            {this.state.request ?<hr className="hr-border-color "/> : ''}
                        </div>
                        <div className="col-lg-6">
                            <button type='submit' onClick={this.parkingResponse} className="btn btn-block btn-danger">Parking Response</button>
                            {this.state.response ?<hr className="hr-border-color "/> : ''}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className={this.state.request ? 'wrap-border table-col-gui':'hidden-ul'}>
                                <ParkingRequestTable search={this.state.search} data={{
                                    start_log: this.state.start_log,
                                    end_log: this.state.end_log,
                                    zone: this.state.zone,
                                    user_number: this.state.user_number
                                }} />
                            </div>
                            <div className={this.state.response ? 'wrap-border table-col-gui':'hidden-ul'}>
                                <ParkingResponseTable search={this.state.search} data={{
                                    start_log: this.state.start_log,
                                    end_log: this.state.end_log,
                                    zone: this.state.zone,
                                    user_number: this.state.user_number
                                }} />

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default withRouter(ParkingService);