import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from "pubsub-js";
import localForages from "localforage";
import Cookies from "universal-cookie";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class PaymentTransactionTwoTable extends Component{
    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info:false,
                bLengthChange: false,
                bAutoWidth:true,
                bProcessing: true,
                bScrollInfinite: true,
                bScrollCollapse: true,
                sScrollY: "330px",
                pagingType: "simple",

                data:this.props.data,
                columns: [
                    { title: "User ID",
                      className: 'user_uud'
                    },
                    { title: "User",
                      data: null,
                      defaultContent:`<button type="button" class="btn btn-info" id="get_user_id" ><i class="fa fa-info-circle"></i></button>`
                    },
                    { title: "Payment Type"},
                    { title: "Payment Data",
                      className: "payment_data"
                    },
                    { title: "Transaction Started"},
                    { title: "Transaction Update"},
                    { title: "Payment Status"}
                ]
            }
        );

        $(document).ready(() => {
            const table = $('#payment_transactions');

            table.on('click', '#get_user_id', function () {

                const id = $(this).parent().parent();

                var get_id = { 'ud' : [] };

                id.find('.user_uud').each(function( index,item ) {
                    const cookies = new Cookies();
                    cookies.set('paymentTransactions', item.innerHTML);

                    get_id['ud'].push(item.innerHTML);
                });

                PubSub.publish('paymentTransactions', get_id);

            });
        });

    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id="payment_transactions" width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}