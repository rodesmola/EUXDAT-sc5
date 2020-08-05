<template>
    <div>
        <UserPolygons/>

        <v-layout row wrap class="pa-1">
            <v-flex xs6>
                <v-menu ref="menuStartDate" v-model="menuStartDate" :close-on-content-click="false" :nudge-right="40" lazy
                transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field color="#5cb860" :value="startDate" slot="activator" label="Start date*"
                    :rules="inputDateRules" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker ref="picker" v-model="startDate" scrollable color="#5cb860" first-day-of-week="1"
                    :max="new Date().toISOString().substr(0, 10)" min="1985-01-01" @change="saveStartDate">
                </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs6>
                <v-menu ref="menuEndDate" v-model="menuEndDate" :close-on-content-click="false" :nudge-right="40" lazy
                transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field color="#5cb860" :value="endDate" slot="activator" label="End date"
                    :rules="inputDateRules" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker ref="picker" v-model="endDate" scrollable color="#5cb860" first-day-of-week="1"
                    :max="new Date().toISOString().substr(0, 10)" min="1985-01-01" @change="saveEndDate">
                </v-date-picker>
                </v-menu>
            </v-flex>   

            <v-flex xs12 sm12 md12 lg12 class="text-xs-right" style="padding: 0px; margin-bottom: 5px;">
                <v-btn small dark round color="#27304c" :loading="isLoading"  @click="mzService()" title="Run service" >
                    RUN
                </v-btn>
            </v-flex>
            
        </v-layout>

        <!------------ Progress dialog start ------------>
        <v-dialog v-model="isLoading" persistent max-width="180">

            <v-card>
            <v-card-text style="text-align: center;">
                <img style="width: 120px;" src="../assets/logo_titulo.png" alt="">

                <v-progress-circular :size="60" :width="7" color="green" indeterminate style="margin-top: 15px;"></v-progress-circular>

                <v-flex xs12 style="color: #37aa48; font-size 12px; margin-bottom: 10px; margin-top: 10px;">
                Processing...
                </v-flex>
            </v-card-text>
            </v-card>

        </v-dialog>
        <!------------ Progress dialog end ------------>

    </div> 
</template>

<script>
import UserPolygons from '@/components/UserPolygons.vue';
import TileWMS from 'ol/source/TileWMS.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

export default {
    name: "ManagementZone",
    components: {
        UserPolygons
    },
    props: {},
    data: () => ({
        inputDateRules: [
            v => !!v || ''
        ],
        startDate: "2018-06-01",
        endDate: "",
        menuStartDate: false,
        menuEndDate: false,
        isLoading: false,             
    }),
    watch: {
        menuStartDate (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
        menuEndDate (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },  
    },
    methods: {
        mzService(){

            this.isLoading = true;        
            var self = this;
             var url = 'https://sc5-backend.test.euxdat.eu/backend/management-zone/startdate/'.concat(this.startDate, '/');
             if(this.endDate){
                 url = url.concat('enddate/', this.endDate, '/')
             }

            //var url = 'https://sc5-backend.test.euxdat.eu/backend/management-zone/startdate/2018-06-01/enddate/2018-09-15/'

            var headers = {
                'accept': 'application/json'  ,
                'Content-Type': 'application/json'
            };

            var geoJSON =
                {
                'type': 'FeatureCollection',
                'crs': {
                'type': 'name',
                'properties': {
                    'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'
                    }
                },
                'features': [{
                    'type': 'Feature',
                    'properties': {"name": self.$store.state.selectedPolygon.get('culture')},
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': self.$store.state.selectedPolygon.getGeometry().getCoordinates()
                        }
                    }]
                }

            this.$http.post(url, geoJSON, {headers}).then(response => {
                self.isLoading = false;
                self.addOutputLayer(response.body)                
                this.$eventBus.$emit('show-alert', "success", response.statusText);
            }, response => {
                self.isLoading = false;
                console.log(response)
                if(response.status == 422){
                    this.$eventBus.$emit('show-alert', "error", response.body.message);
                }else{
                    this.$eventBus.$emit('show-alert', "error", response.statusText);
                }
                
            });
        
        },
        addOutputLayer(response){        
            var self = this;          
            var polygonBBOX = self.$store.state.selectedPolygon.getGeometry().getExtent();

            var layer = new TileLayer({
                source: new TileWMS({
                    url: response.wms_endpoint,
                    params: {
                        'SERVICE': 'WMS',
                        'REQUEST': 'GetMap',
                        'BBOX': polygonBBOX[1].toString().concat(',', polygonBBOX[0].toString(),
                            ',', polygonBBOX[3].toString(), ',', polygonBBOX[2].toString()),
                        'SRS': 'EPSG:4326',
                        'HEIGHT': '1000',
                        'WIDTH': '953',
                        'LAYERS': response.wms_layer,
                        'FORMAT': 'image/png',
                        'TRANSPARENT': 'true'
                    },
                })
            })

            layer.set('name', 'outputRaster')
            layer.setZIndex(1);
            self.$store.state.map.addLayer(layer)
            this.$eventBus.$emit('show-outputPanel', true, response.dates_for_norm_mean);

        }, //addOutputLayer
        saveStartDate (date) {
            this.$refs.menuStartDate.save(date)
        },
        saveEndDate (date) {
            this.$refs.menuEndDate.save(date)
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
