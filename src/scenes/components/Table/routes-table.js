import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import PubSub from "pubsub-js";
import localForages from "localforage";

// require Table
const $  = require( 'jquery' );
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class RoutesTable extends Component{
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onOpen();
    }

    componentDidMount() {
        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info: false,
                bProcessing: true,
                bServerSide: true,
                sProcessing: true,
                bLengthChange: false,
                bPaginate:true,
                pagingType: "simple",

                // sScrollY: "300px",
                ajax: {
                    url: 'https://api.globaltel.rs/new-gui/?url=read-routes',
                    type: 'POST',
                    data: {
                        name: this.props.data.routes_name,
                        direction: this.props.data.direction,
                        active: this.props.data.active
                    }
                },
                columns: [
                    { title: "Route ID",
                      className: "RouteId"
                    },
                    { title: "Route Name",
                        className: "RouteName"
                    },
                    { title: "Host",
                        className: "hosts"
                    },
                    { title: "Outbound",
                        className: "Outbound"
                    },
                    { title: "Inbound",
                        className: "Inbound"
                    },
                    { title: "IP",
                        className: "IP"
                    },
                    { title: "Active",
                        className: "Active"
                    },
                    { title: "Actions",
                        targets: -1,
                        data: null,
                        defaultContent:`<button type="button" class="btn btn-info" id="edit-routes" ><i class="fa fa-edit"></i></button>`
                    }
                ]
            }
        );


        $(document).ready(() => {

            const table = $('#routes');

            table.on('click', '#edit-routes', function () {

                const id = $(this).parent().parent();

                const get_id = { 'id' : [] , 'route_name' : [] , 'host' : [] , 'outbound' : [] , 'inbound' : [] , 'ip' : [] , 'active' : [] };

                id.find('.RouteId').each(function( index,item ) {
                    get_id['id'].push(item.innerHTML);
                });

                id.find('.RouteName').each(function( index,item ) {
                    get_id['route_name'].push(item.innerHTML);
                });

                id.find('.hosts').each(function( index,item ) {
                    get_id['host'].push(item.innerHTML);
                });

                id.find('.Outbound').each(function( index,item ) {
                    get_id['outbound'].push(item.innerHTML);
                });

                id.find('.Inbound').each(function( index,item ) {
                    get_id['inbound'].push(item.innerHTML);
                });

                id.find('.IP').each(function( index,item ) {
                    get_id['ip'].push(item.innerHTML);
                });

                id.find('.Active').each(function( index,item ) {
                    get_id['active'].push(item.innerHTML);
                });

                PubSub.publish('id_routes-edit', get_id);

            });
        });


    }

    componentDidUpdate() {

        if(this.props.search === true) {

            let table = $('#routes').DataTable();
            table.destroy();


            this.$elee = $(this.el);
            this.$elee.DataTable(
                {
                    info: false,
                    bProcessing: true,
                    bServerSide: true,
                    sProcessing: true,
                    bLengthChange: false,
                    bPaginate:true,
                    pagingType: "simple",

                    // sScrollY: "300px",
                    ajax: {
                        url: 'https://api.globaltel.rs/new-gui/?url=read-routes',
                        type: 'POST',
                        data: {
                            name: this.props.data.routes_name,
                            direction: this.props.data.direction,
                            active: this.props.data.active
                        }
                    },
                    columns: [
                        { title: "Route ID",
                            className: "RouteId"
                        },
                        { title: "Route Name",
                            className: "RouteName"
                        },
                        { title: "Host",
                            className: "hosts"
                        },
                        { title: "Outbound",
                            className: "Outbound"
                        },
                        { title: "Inbound",
                            className: "Inbound"
                        },
                        { title: "IP",
                            className: "IP"
                        },
                        { title: "Active",
                            className: "Active"
                        },
                        { title: "Actions",
                            targets: -1,
                            data: null,
                            defaultContent:`<button type="button" class="btn btn-info" id="edit-routes" ><i class="fa fa-edit"></i></button>`
                        }
                    ]
                }
            );
            this.handleChange();
        }
    }

    componentWillUnmount() {
        // this.$el.DataTable.destroy(true);
    }

    render() {
        return <div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" id='routes' width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}