import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";
import PubSub from "pubsub-js";
import Cookies from "universal-cookie";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class IPayTransactionTable extends Component{
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
                    { title: "ID"},
                    { title: "Created"},
                    { title: "User ID",
                      className: 'user_id_ipay'
                    },
                    { title: "User",
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-info" id="ipay_user_id_button" ><i class="fa fa-info"></i></button>`
                    },
                    { title: "Amount"},
                    { title: "Currency"},
                    { title: "State"},
                    { title: "Transfer Type"},
                    { title: "Response ID"},
                    { title: "Core transaction id"},
                    { title: "Description"}
                ]
            }
        );


        $(document).ready(() => {
            const table = $('#ipay_Table');

            table.on('click', '#ipay_user_id_button', function () {

                const id = $(this).parent().parent();

                var get_id = { 'td' : [] };

                id.find('.user_id_ipay').each(function( index,item ) {
                    const cookies = new Cookies();
                    cookies.set('iPayTransactions', item.innerHTML);

                    get_id['td'].push(item.innerHTML);
                });

                PubSub.publish('iPayTransactions', get_id);

            });
        });
    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='ipay_Table' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}