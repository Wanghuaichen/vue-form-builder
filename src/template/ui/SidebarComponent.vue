<template>
    <div>
        <div class="controlSidebar list-group" v-show="!isConfig">
            <a href="#" class="list-group-item active">
                Supported Controls
            </a>
            <div id="sidebarControls">
                <a href="javascript:void(0)" class="list-group-item list-group-item-action control-wrapper"
                   v-for="(obj, value) in controls" :data-control-type="value">
                    <font-awesome-icon :icon="obj.icon"></font-awesome-icon> {{obj.label}}
                </a>
            </div>
        </div>
        <div class="settingSidebar card" v-if="isConfig">
            <div class="card-body">
                <div class="row mb-2">
                    <div class="col-md-6">
                        <h4>{{controlInfo.label}}</h4>
                    </div>
                    <div class="col-md-6 text-right">
                        <button class="btn btn-default" @click="applyEditSidebar">Apply</button>
                        <button class="btn btn-default" @click="closeEditSidebar">Close</button>
                    </div>
                </div>

                <sidebar-config-item :control="controlInfo">
                </sidebar-config-item>
            </div>
        </div>
    </div>
</template>

<script>
    import {FORM_CONSTANTS} from "config/constants";
    import {eventBus, EventHandlerConstant} from 'template/handler/event_handler';
    import SidebarConfigItem from "./common/SidebarConfigItem";
    import {ControlHandler} from 'template/handler/control_handler';

    export default {
        components: {SidebarConfigItem},
        name: "sidebar-component",
        data: () => ({
            controls: FORM_CONSTANTS.Type,
            isConfig: false,
            controlInfo: null
        }),
        methods: {
            closeEditSidebar() {
                this.isConfig = false;
                this.controlInfo = null;
                ControlHandler.clearSelect();
            },
            applyEditSidebar() {
                if (this.controlInfo.name !== ControlHandler.getSelectedItem()) {
                    return;
                }

                // pre apply
                this.controlInfo.decimalPlace = parseInt(this.controlInfo.decimalPlace);

                // run hook here

                eventBus.$emit(EventHandlerConstant.ON_APPLY_EDITOR_SIDEBAR, this.controlInfo);

                // run hook here
            }
        },
        created() {
            eventBus.$on(EventHandlerConstant.ACTIVATE_EDITOR_SIDEBAR, controlInfo => {
                this.isConfig = true;
                this.controlInfo = controlInfo;
            });
        },
        mounted() {
            // insert controls
            $(".list-group-item", $("#sidebarControls")).draggable({
                appendTo: 'body',
                containment: '',
                scroll: false,
                helper: 'clone',
                revert: true,
                zIndex: 9999,
                cancel: ".list-group-item-success",
                start: function(event, ui){
                    $(ui.helper).css('width', `${ $(event.target).width() }px`);
                }
            });

            $(this.$el).find('.controlSidebar').droppable({
                accept: ".controlItem",
                drop: function (event, ui){
                    // remove control
                    eventBus.$emit(EventHandlerConstant.REMOVE_CONTROL, ui);
                },
                over: function( event, ui ) {
                    ui.helper.css('border', '1px solid red');
                },
            });
        }
    }
</script>

<style scoped>

</style>