<template>
    <div>
        <div style="background-color: white; padding-left: 10px; padding-right: 10px;">
        <UserPolygons :key="componetUPkey"/>
            <v-form ref="form" style="margin-top: 10px; margin-bottom: 5px; text-size: 10px;" lazy-validation >
                <v-layout row wrap style="text-align: left; padding-top: 8px;">

                    <v-flex xs6>
                        <v-menu ref="menuStartDate" v-model="menuStartDate" :close-on-content-click="false" :nudge-right="40" lazy
                        transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field color="#5cb860" :value="startDate" slot="activator" label="Start date*"
                            :rules="inputDateRules" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker ref="picker" v-model="startDate" scrollable color="#5cb860" first-day-of-week="1"
                            :max="new Date().toISOString().substr(0, 10)" min="2017-01-01" @change="saveStartDate">
                        </v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs6>
                        <v-menu ref="menuEndDate" v-model="menuEndDate" :close-on-content-click="false" :nudge-right="40" lazy
                        transition="scale-transition" offset-y full-width min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field color="#5cb860" :value="endDate" slot="activator" label="End date*"
                            :rules="inputDateRules" prepend-icon="event" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker ref="picker" v-model="endDate" scrollable color="#5cb860" first-day-of-week="1"
                            :max="new Date().toISOString().substr(0, 10)" :min="startDate" @change="saveEndDate">
                        </v-date-picker>
                        </v-menu>
                    </v-flex>   

                    <v-flex xs12 sm12 md12 lg12>
                        <small>* Indicates required field</small>
                        <v-divider ></v-divider>
                    </v-flex>

                    <v-flex xs12 sm12 md12 lg12 v-if="!isSelected" class="green panel-chip">
                        <span color="#4ba64f" label>Please select a polygon to start the service.</span>
                    </v-flex>

                    <v-flex xs12 sm12 md12 lg12 v-if="isSelected" class="text-xs-right" style="padding: 0px; margin-bottom: 5px;">
                        <v-btn small round color="#27304c" dark @click="pcService()" title="Run service" >
                        RUN
                        </v-btn>
                    </v-flex>
            
                </v-layout>
            </v-form>
        </div>   

        <!------------ Phenologic curve dialog ------------>
        <v-dialog v-model="pcDialog" max-width="850">
            <v-card v-if = !isLoading> 
                <v-card-title class="headline">
                    <img style="width: 130px;" src="../assets/logo_titulo.png" alt="">
                    <v-spacer></v-spacer>
                    <v-btn icon title="Download graphic" @click="downloadGraph()">
                    <v-icon color="#27304c">archive</v-icon>
                    </v-btn>
                </v-card-title>

                <v-divider></v-divider>
                <v-card-text>
                    <v-flex xs12  class="pa-3" >
                        <img style="width: 800px" :src="diagramURL"/>                                       
                    </v-flex>
                </v-card-text>
            </v-card>
            <v-card v-if = isLoading>
                <v-card-text style="text-align: center;">
                    <img style="width: 120px;" src="../assets/logo_titulo.png" alt=""><br>
                    <v-progress-circular :size="60" :width="7" color="green" indeterminate style="margin-top: 15px;"></v-progress-circular>
                    <v-flex xs12 style="color: #37aa48; font-size 12px; margin-bottom: 10px; margin-top: 10px;">
                    Processing...
                    </v-flex>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!------------ /Phenologic curve dialog ------------>

    </div>
</template>

<script>
import UserPolygons from '@/components/UserPolygons.vue'
import CONST from "../const";
export default {
    name: "PhenologicCurve",
    components: {
        UserPolygons
    },
    props: {},
    data: () => ({
        euxdatURL: CONST.euxdatURL,
        inputDateRules: [
            v => !!v || ''
        ],
        startDate: "2020-05-01",
        endDate: "2020-09-30",
        menuStartDate: false,
        menuEndDate: false,
        isLoading: false,
        pcDialog: false,
        diagramURL: "",
        isSelected: false,
        componetUPkey: 0,
    }),
    methods: {
        pcService(){

            this.isLoading = true;
            this.pcDialog = true;
            var self = this;
            var url = this.euxdatURL.concat('/backend/phenology/startdate/',this.startDate, '/enddate/', this.endDate, '/png');

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

            this.$http.post(url, geoJSON).then(response => {
                self.isLoading = false;              
                self.diagramURL = this.euxdatURL.concat(response.body.url);                
                this.$eventBus.$emit('show-alert', "success", response.statusText);
            }, response => {
                self.isLoading = false;
                this.$eventBus.$emit('show-alert', "error", response.statusText);
            });
        
        },
        /**
        * Open the image in other browser tab to force to be download
        *
        * @public
        */
        downloadGraph(){
            window.open(this.diagramURL) 
        },        
        saveStartDate (date) {
            this.$refs.menuStartDate.save(date)
        },
        saveEndDate (date) {
            this.$refs.menuEndDate.save(date)
        },
    },
    watch: {
        menuStartDate (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
        menuEndDate (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },  
    },
    created(){
        this.$eventBus.$on('is-selected', (bool)  => {
            this.isSelected = bool;            
        });
        this.$eventBus.$on('updateComponetPC', (i)  => {
            this.componetUPkey = i          
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-input {
	font-size: 12px;
	text-align: left;
}
.v-text-field {
	padding-top: 0px;
	margin-top: 4px;
}

.v-btn--small {
	font-size: 12px;
	height: 20px;
	padding: 0 8px;
  min-width: 58px;
}

.panel-chip {
  padding: 0px;
  text-align: center;
  margin: 5px;
  padding: 2px;
  border-radius: 2px;
  justify-content:
  space-between;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
}
</style>


