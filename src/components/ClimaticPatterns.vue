<template>
<div>  
    <div>        
        <v-flex xs12 pl-2 row class="hidden-md-and-down">
            <v-layout row wrap>
            <p style="color: #27304c; font-size 6px;" class="pl-2 pr-2">
                Select an analisys to run for the area you are seeing in the map. 
                Then click the "run" button to display the result.
            </p>
            </v-layout>
        </v-flex>                    

        <v-flex sm9 xs9 md9 pa-2>
            <v-combobox style="margin-top: 0px; padding-top: 0px"
            v-model="selectedMbService"
            :items="mbServices"
            item-text="name"
            item-value="value"
            label="Select service"
            color="green"
            ></v-combobox>
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex xs12 pl-2 row v-if="selectedMbService.value == 'history_frostrisk?'">
            <v-layout row wrap>
            <p style="color: grey; font-size 8px; margin-bottom: 5px;">
                <b>Cold event analysis:</b>
                Probability of temperatures below or above a certain temperature threshold for a given time.
            </p>
            <v-flex xs6>
                <v-text-field dense color="#77b942" type="number" v-model="cold_tmp_threshold" :value="cold_tmp_threshold"
                label="Temperature threshold *" :rules="inputNumRules" required></v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field color="#77b942" type="number" v-model="cold_dur_threshold" :value="cold_dur_threshold"
                label="Duration threshold *" :rules="inputNumRules" required></v-text-field>
            </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 pl-2 row v-if="selectedMbService.value == 'history_heatrisk?'">
            <v-layout row wrap>
            <p style="color: grey; font-size 8px;">
                <b>Warm event analysis:</b>
                Probability of temperatures below or above a certain temperature threshold for a given time.
            </p>
            <v-flex xs6>
                <v-text-field dense color="#77b942" type="number" v-model="warn_tmp_threshold" :value="warn_tmp_threshold"
                label="Temperature threshold *" :rules="inputNumRules" required></v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field color="#77b942" type="number" v-model="warn_dur_threshold" :value="warn_dur_threshold"
                label="Duration threshold *" :rules="inputNumRules" required></v-text-field>
            </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 pl-2 row v-if="selectedMbService.value == 'history_preciprisk?'">
            <v-layout row wrap>
            <p style="color: grey; font-size 8px;">
                <b>Precipitation analysis:</b>
                evaluates precipitation amounts in a week above a certain threshold. Similar to cold and warm events,
                estimate strong precipitation events can be estimated for scheduling activities accordingly.
            </p>
            <v-flex xs6>
                <v-text-field dense color="#77b942" type="number" v-model="prec_threshold" :value="prec_threshold"
                label="Precipitation threshold *" :rules="inputNumRules" required></v-text-field>
            </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 pl-2 row  v-if="selectedMbService.value == 'history_watercapacity?'">
            <v-layout row wrap>
            <p style="color: grey; font-size 8px;">
                <b>Water capacity:</b>
                estimated probability of remaining soil water amount. Select the maximum amount of soil water capacity depending on your soil and crop type.
            </p>
            <v-flex xs6>
                <v-text-field dense color="#77b942" type="number" v-model="wat_cap_threshold" :value="wat_cap_threshold"
                label="Maximum available soil water capacity threshold *" :rules="inputNumRules" required></v-text-field>
            </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 pl-2 row  v-if="selectedMbService.value == 'history_cloudcover?'">
            <v-layout row wrap>
            <p style="color: grey; font-size 8px;">
                <b>Cloud cover:</b>
                cloud free hours per day.
            </p>
            <v-flex xs6>
                <v-text-field dense color="#77b942" type="number" v-model="cloud_cvr_threshold" :value="cloud_cvr_threshold"
                label="Cloud cover threshold % *" :rules="inputNumRules" required></v-text-field>
            </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 pl-2 row  v-if="selectedMbService.value == 'predict-growth-stages'">
            <v-layout row wrap>

            <v-flex xs6>
                <v-menu ref="menuPlantingDate" v-model="menuPlantingDate" :close-on-content-click="false" :nudge-right="40" lazy
                transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field color="#5cb860" :value="growth_stages.planting_date" slot="activator" label="Planting date*"
                    :rules="inputDateRules" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker ref="picker" v-model="growth_stages.planting_date" scrollable color="#5cb860" first-day-of-week="1"
                    :max="new Date().toISOString().substr(0, 10)" min="1985-01-01" @change="savePlantingDate">
                </v-date-picker>
                </v-menu>
            </v-flex>
            <v-flex xs6>
                <v-menu ref="menuStemDate" v-model="menuStemDate" :close-on-content-click="false" :nudge-right="40" lazy
                transition="scale-transition" offset-y full-width min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field color="#5cb860" :value="growth_stages.stem_elong_date" slot="activator" label="STEM date*"
                    :rules="inputDateRules" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker ref="picker" v-model="growth_stages.stem_elong_date" scrollable color="#5cb860" first-day-of-week="1"
                    :max="new Date().toISOString().substr(0, 10)" min="1985-01-01" @change="saveStemDate">
                </v-date-picker>
                </v-menu>
            </v-flex>    

            <v-flex xs6>
                <v-text-field dense color="#77b942" type="number" v-model="growth_stages.T_base" :value="growth_stages.T_base"
                label="Temp base *" :rules="inputNumRules" required></v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field dense color="#77b942" type="number" v-model="growth_stages.T_max" :value="growth_stages.T_max"
                label="Temp max *" :rules="inputNumRules" required></v-text-field>
            </v-flex>

            <v-flex sm9 xs6 md6 lg9 xlg6 pa-1>
                <v-combobox style="margin-top: 0px; padding-top: 0px"
                v-model="growth_stages.crop_name"
                :items="gs_cropName"
                item-text="name"
                item-value="value"
                label="Select crop name"
                color="green"
                ></v-combobox>
            </v-flex>

            <v-flex sm9 xs6 md6 lg9 xlg6 pa-1>
                <v-combobox style="margin-top: 0px; padding-top: 0px"
                v-model="growth_stages.w_domain"
                :items="gs_wDomain"
                item-text="name"
                item-value="value"
                label="Select domain"
                color="green"
                ></v-combobox>
            </v-flex>

            </v-layout>
        </v-flex>
                    
        <v-flex xs12 sm12 md12 lg12 class="text-xs-right" style="padding: 0px; margin-bottom: 5px;">
            <v-btn small round color="#27304c" :disabled="!selectedMbService" :loading="isLoading" dark @click="mbService(selectedMbService)" title="Run service" >
            RUN
            </v-btn>
        </v-flex>
    </div>


    <!------------ MeteoBlue dialog ------------>
    <v-dialog v-model="mbDialog" max-width="800">
        <v-card v-if = !isLoading> 
            <v-card-title class="headline">
                <img style="width: 130px;" src="../assets/logo_titulo.png" alt="">
                <v-spacer></v-spacer>
                <v-btn icon title="Download graphic" @click="downloadGraph('default')">
                <v-icon color="#27304c">archive</v-icon>
                </v-btn>
            </v-card-title>

            <v-divider></v-divider>
            <v-card-text>
                <v-flex xs12  class="pa-3" >
                <v-img :src="grahpURL" alt=""></v-img>
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
    <!------------ /MeteoBlue dialog ------------>

    <!------------ MeteoBlue GS dialog ------------>
    <v-dialog v-model="mbGSDialog" max-width="900">
        <v-card>
            <v-card-title class="headline">
                <img style="width: 130px;" src="../assets/logo_titulo.png" alt="">
            </v-card-title>

            <v-divider></v-divider>
            <v-card-text>

            <v-layout row wrap style="text-align: center;" class="mb-2">
                <v-flex xs6 class="pa-1">
                <span class="titleDate" style="color: #37aa48; font-size 12px;">
                    Predicted flowering date: 
                </span>                  
                <span class="titleDate" style="color: balck">
                    {{diagramURL.predicted_flowering_date}}
                </span>                  
                </v-flex>
                <v-flex xs6 class="pa-1">
                <span class="titleDate" style="color: #37aa48; font-size 12px;">
                    Predicted flowering date (forecast): 
                </span>                  
                <span class="titleDate" style="color: balck">
                    {{diagramURL.predicted_flowering_date_with_forecast}}
                </span>                  
                </v-flex>

            </v-layout >  

            <v-flex xs12 class="mb-1">
                <v-card hover>
                <v-card-title primary-title>
                    <h3 class="headline title" style="color: #37aa48; font-size 14px; ">Cumulated degree days horuly</h3>
                    <v-spacer></v-spacer>
                    <v-btn icon title="Download graphic" @click="downloadGraph(diagramURL.CDD_image_url)">
                    <v-icon color="#27304c">archive</v-icon>
                    </v-btn>         
                </v-card-title>
                <v-img v-if="diagramURL.CDD_image_url" :src="'https://growth-stages.test.euxdat.eu/backend/predict-growth-stages/images/' + 
                    diagramURL.CDD_image_url" alt=""></v-img>
                </v-card>
            </v-flex>

            <v-flex xs12 class="mb-1">
                <v-card hover>
                <v-card-title primary-title>
                    <h3 class="headline title" style="color: #37aa48; font-size 14px; ">Cumulated precipitation (mm)</h3>
                    <v-spacer></v-spacer>
                    <v-btn icon title="Download graphic" @click="downloadGraph(diagramURL.CPREC_image_url)">
                    <v-icon color="#27304c">archive</v-icon>
                    </v-btn>         
                </v-card-title>
                <v-img v-if="diagramURL.CPREC_image_url" :src="'https://growth-stages.test.euxdat.eu/backend/predict-growth-stages/images/' + 
                    diagramURL.CPREC_image_url" alt=""></v-img>
                </v-card>
            </v-flex>

            <v-flex xs12 class="mb-1">
                <v-card hover>
                <v-card-title primary-title>
                    <h3 class="headline title" style="color: #37aa48; font-size 14px; ">Cumulated radiation (W/m2)</h3>
                    <v-spacer></v-spacer>
                    <v-btn icon title="Download graphic" @click="downloadGraph(diagramURL.CRAD_image_url)">
                    <v-icon color="#27304c">archive</v-icon>
                    </v-btn>         
                </v-card-title>
                <v-img v-if="diagramURL.CRAD_image_url" :src="'https://growth-stages.test.euxdat.eu/backend/predict-growth-stages/images/' + 
                    diagramURL.CRAD_image_url" alt=""></v-img>
                </v-card>
            </v-flex>

            <v-flex xs12>
                <v-card hover>
                <v-card-title primary-title>
                    <h3 class="headline title" style="color: #37aa48; font-size 14px; ">Average soil moisture (fraction)</h3>
                    <v-spacer></v-spacer>
                    <v-btn icon title="Download graphic" @click="downloadGraph(diagramURL.CSOILM_image_url)">
                    <v-icon color="#27304c">archive</v-icon>
                    </v-btn>         
                </v-card-title>
                <v-img v-if="diagramURL.CSOILM_image_url" :src="'https://growth-stages.test.euxdat.eu/backend/predict-growth-stages/images/' + 
                    diagramURL.CSOILM_image_url" alt=""></v-img>
                </v-card>
            </v-flex>

            </v-card-text>

        </v-card>
    </v-dialog>
    <!------------ /MeteoBlue GS dialog ------------>

    </div>

</template>

<script>

import moment from 'moment';
export default {
    name: "ClimaticPatterns",
    props: {},
    data: () => ({
        isValid: false,
        inputNumRules: [
        //v => !!v || 'Required field',
        v => (v && /^\d+(\.\d{1,20})?$/.test(v)) || ''
        ],
        cold_tmp_threshold: 1,
        cold_dur_threshold: 1,
        warn_tmp_threshold: 30,
        warn_dur_threshold: 1,
        prec_threshold: 30,
        wat_cap_threshold: 100,
        cloud_cvr_threshold: 15,
        API_key: "8vh83gfhu34g",
        gs_cropName: ['Maize', 'Sunflower', 'Summer_wheat'],
        gs_wDomain: ['NEMSGLOBAL', 'NEMS4'],
        growth_stages:{
        planting_date: '2015-04-14',
        stem_elong_date: '2015-05-10',
        crop_name: 'Maize',
        T_base: 10,
        T_max: 30,
        w_domain: 'NEMSGLOBAL',
        },
        mbServices: [
        {
            'name': 'Cold event analysis',
            'value': 'history_frostrisk?'
        },
        {
            'name': 'Warm event analysis',
            'value': 'history_heatrisk?'
        },
        {
            'name': 'Precipitation history analysis',
            'value': 'history_preciprisk?'
        },
        {
            'name': 'Soil water capacity analysis',
            'value': 'history_watercapacity?'
        },
        {
            'name': 'Cloud cover analysis',
            'value': 'history_cloudcover?'
        },
        {
            'name': 'Predict growth stages',
            'value': 'predict-growth-stages'
        }     
        ],
        selectedMbService:"",
        grahpURL: "",
        mbDialog: false,
        mbGSDialog: false,
        diagramURL: {},
        outputPanel: false,
        isLoading: false,
        inputDateRules: [
        v => !!v || ''
        ],
        menuPlantingDate: false,
        menuStemDate: false,
    }),
    watch: {
        menuPlantingDate (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },
        menuStemDate (val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
        },  
    },
    methods: {

        getMapCenter() {
            this.$eventBus.$emit('get-map-center');            
        },

        /**
        * Create the url to acces the output mb diagram
        *
        * @param {string} service
        * @public
        */
        mbService(service){

            var self = this;
            this.isLoading = true;            
            var coords4326 = this.$store.state.map.getView().getCenter();           

            if(service.value != 'predict-growth-stages'){
                var url = 'http://my.meteoblue.com/visimage/'.concat(service.value,
                '&lat=', coords4326[1].toString(), '&lon=', coords4326[0].toString(), '&apikey=', this.API_key);

                if(service.value === 'history_frostrisk?'){
                    this.grahpURL = url.concat('&thr=', this.cold_tmp_threshold, '&frostlength=', this.cold_dur_threshold);
                }else if (service.value === 'history_heatrisk?') {
                    this.grahpURL = url.concat('&thr=', this.warn_tmp_threshold, '&frostlength=', this.warn_dur_threshold);
                }else if (service.value === 'history_preciprisk?') {
                    this.grahpURL = url.concat('&thr=', this.prec_threshold);
                }else if (service.value === 'history_watercapacity?') {
                    this.grahpURL = url.concat('&thr=', this.wat_cap_threshold);
                }else if (service.value === 'history_cloudcover?') {
                    this.grahpURL = url.concat('&thr=', this.cloud_cvr_threshold);
                }

                this.$http.get(this.graphURL).then(response => {
                this.mbDialog = true;                    
                setTimeout(function(){ 
                    self.isLoading = false; 
                    //self.showAlert("success", "Diagram retrieved successfully");
                    self.$eventBus.$emit('show-alert', "success", "Diagram retrieved successfully"); 
                }, 4000);                           
                }, response => {
                    this.isLoading = false;
                    //this.showAlert("error", response.statusText);
                    this.$eventBus.$emit('show-alert', "error", response.statusText); 
                });
            } else {

                var urlGS = 'https://growth-stages.test.euxdat.eu/backend/predict-growth-stages/';

                var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'              
                };

                var payload = {
                    "longitude": coords4326[0],
                    "latitude": coords4326[1],
                    "planting_date": this.growth_stages.planting_date,
                    "stem_elong_date": this.growth_stages.stem_elong_date,
                    "crop_name": this.growth_stages.crop_name,
                    "T_base": parseInt(this.growth_stages.T_base),
                    "T_max": parseInt(this.growth_stages.T_max),
                    "aggr": this.growth_stages.w_domain
                }

                this.$http.post(urlGS, payload, headers).then(response => {               
                    this.diagramURL = response.body;
                    this.mbGSDialog = true;
                    this.isLoading = false;
                    // this.showAlert("success", "Diagram retrieved successfully");
                    this.$eventBus.$emit('show-alert', "success", "Diagram retrieved successfully");
                }, response => {     
                    this.isLoading = false;   
                    // this.showAlert("error", response.statusText);
                    this.$eventBus.$emit('show-alert', "error", response.statusText); 
                });
            }
        },//mbService
        /**
        * Open the image in other browser tab to force to be download
        *
        * @public
        */
        downloadGraph(url){
            if(url == 'default'){
                window.open(this.grahpURL)
            }else{
                window.open('https://growth-stages.test.euxdat.eu/backend/predict-growth-stages/images/' + url)
            }      
        },
        savePlantingDate (date) {
            this.$refs.menuPlantingDate.save(date)
        },
        saveStemDate (date) {
            this.$refs.menuStemDate.save(date)
        },
    },
    created(){
    }, 
    filters: {
        truncate: function(value) {
            if(value != undefined){
                value = value.toString().substring(0, 8);
            }
            return value
        },
        formatDate: function(value) {
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY hh:mm')
            }
        }
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


