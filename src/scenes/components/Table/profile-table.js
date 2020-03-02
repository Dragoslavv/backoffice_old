import React, { Component } from 'react';
import './../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import {deleteUsers} from "../UserFunctions";
import PubSub from 'pubsub-js';
import $ from 'jquery';

// require Table
$.DataTable = require( 'datatables.net' );
$.DataTable = require( 'datatables.net-bs4' );

export class ProfileTable extends Component{

    componentDidMount() {

        this.$el = $(this.el);
        this.$el.DataTable(
            {
                info:false,
                bLengthChange: false,
                data:this.props.data,
                responsive: true,
                columns: [
                    { title: "Id"},
                    { title: "Username"},
                    { title: "First Name"},
                    { title: "Last Name"},
                    { title: "Role"},
                    { title: "Email"},
                    { title: "Phone"},
                    { title: "Action",
                      targets: -1,
                      data: null,
                      defaultContent:`<button type="button" class="btn btn-info" id="edit" ><i class="fa fa-edit"></i></button><button type="button" class="btn btn-danger" id="remove"><i class="fa fa-times-circle-o" ></i></button>`
                    },

                ],

            }
        );

        $(document).ready(() => {
            const table = $('table');

            table.on('click', '#edit', function () {

                const id = $(this).parent().parent();

                id.find('td:first-child').each(function( index,item ) {

                    $('#usersUpdate').removeClass('hidden-ul');
                    $('#insertTable').addClass('hidden-ul');

                    window.scrollTo({
                        top: 0
                    });

                    PubSub.publish('cid', item.innerHTML);

                });
            });

            table.on('click', '#remove', function () {

                const id = $(this).parent().parent();

                id.find('td:first-child').each(function( index,item ) {

                    deleteUsers(item.innerHTML).then(data => {

                        if(data.status === true) {

                            $('#deleted').removeClass('hidden-ul');
                            window.scrollTo({
                                top: 0
                            });
                            setInterval(function(){
                                $('#deleted').addClass('hidden-ul');
                                window.location.reload();
                            }, 1000);

                        }

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
            <div className='hidden-ul' id='deleted'>
                <div className="form-group row alert mod-margin alert-warning text-center"  role="alert">
                    You deleted!
                </div>
            </div>
            <table className="table table-striped table-bordered table-responsive-lg wallet" width="100%" ref={el => this.el = el}>
            </table>
        </div>
    }

}