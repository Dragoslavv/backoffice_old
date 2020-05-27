import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import localForages from "localforage";
import PubSub from "pubsub-js";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class PhoneNumbersTable extends Component{
    componentDidMount() {

        const userId = localForages.getItem('user_id_for_phone_numbers', function (err, value) {
            return value;
        });

        userId.then(value => {

            this.$el = $(this.el);
            this.$el.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    bLengthChange: false,
                    pagingType: "simple",

                    bPaginate:true,
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=phone_numbers',
                        type: 'POST',
                        data:{
                            userId: parseInt(value),
                        }
                    },
                    columns: [
                        { title: "Number",
                            className: "msisdn_switch"
                        },
                        { title: "Type"},
                        { title: "Status"},
                        { title: "Autorenew"},
                        { title: "Created"},
                        { title: "Expiration Date"},
                        { title: "Iccid"},
                        { title: "Switch To Sim",
                            data: null,
                            defaultContent:`<p style="margin:0px !important;" ><button type="button" style="padding: 3px !important;" class="btn btn-info" id="switch_to_sim" >To Sim</button></p>`
                        }
                    ]
                }
            );

            $(document).ready(() => {

                const table = $('#phone_numbers');

                table.on('click', '#switch_to_sim', function () {

                    const id = $(this).parent().parent().parent();

                    id.find('.msisdn_switch').each(function( index,item ) {

                        PubSub.publish('switch_to_sim', item.innerHTML);
                        localForages.setItem('switch_to_sim', item.innerHTML);
                    });
                });

            });

        });
    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='phone_numbers' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}