<template>
<div>  
    <div>        
        <v-flex xs12 pl-2 row class="hidden-md-and-down">
            <v-layout row wrap>
            <p style="color: #27304c; font-size 6px;" class="pl-2 pr-2">
                The service will use the coordinates showed in the right side of the map, can be input by the user. 
            </p>
            </v-layout>
        </v-flex>                    

        <v-flex sm9 xs9 md9 class="pl-3 pr-3">
            <v-combobox style="margin-top: 0px; padding-top: 0px"
            v-model="selectedMbService"
            :items="mbServices"
            item-text="name"
            item-value="value"
            label="Select service"
            color="green"
            @change="resetForm()"
            ></v-combobox>
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex xs12 pl-2 row v-if="selectedMbService.value == 'history_frostrisk?'">
            <v-layout row wrap>
                <v-flex xs12 class="pl-3 pr-3">
                    <p style="color: grey; font-size 8px; margin-bottom: 5px;">
                        <b>Cold event analysis:</b>
                        Probability of temperatures below or above a certain temperature threshold for a given time.
                    </p>
                </v-flex>
                <v-flex xs6 class="pl-3 pr-3">
                    <v-text-field hide-no-data hide-selected dense color="#77b942" type="text" v-model="cold_tmp_threshold" 
                        :value="cold_tmp_threshold" label="Temperature threshold *" 
                        @input="$v.cold_tmp_threshold.$touch()" @blur="$v.cold_tmp_threshold.$touch()"
                        :error-messages="cold_tmp_thresholdErrors">                        
                    </v-text-field>
                    </v-flex>
                    <v-flex xs6 class="pl-3 pr-3">
                        <v-text-field hide-no-data hide-selected dense color="#77b942" type="text" v-model="cold_dur_threshold" 
                        :value="cold_dur_threshold" label="Duration threshold *" 
                        @input="$v.cold_dur_threshold.$touch()" @blur="$v.cold_dur_threshold.$touch()"
                        :error-messages="cold_dur_thresholdErrors">                        
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 pl-2 row v-if="selectedMbService.value == 'history_heatrisk?'">
            <v-layout row wrap>
                <v-flex xs12 class="pl-3 pr-3">
                    <p style="color: grey; font-size 8px;">
                        <b>Warm event analysis:</b>
                        Probability of temperatures below or above a certain temperature threshold for a given time.
                    </p>
                </v-flex>
                <v-flex xs6 class="pl-3 pr-3">
                    <v-text-field hide-no-data hide-selected dense color="#77b942" type="text" v-model="warn_tmp_threshold" 
                        :value="warn_tmp_threshold" label="Temperature threshold *"                         
                        @input="$v.warn_tmp_threshold.$touch()" @blur="$v.warn_tmp_threshold.$touch()"
                        :error-messages="warn_tmp_thresholdErrors">                        
                    </v-text-field>
                </v-flex>
                <v-flex xs6 class="pl-3 pr-3">
                    <v-text-field hide-no-data hide-selected dense color="#77b942" type="text" v-model="warn_dur_threshold" 
                        :value="warn_dur_threshold" label="Duration threshold *"
                        @input="$v.warn_dur_threshold.$touch()" @blur="$v.warn_dur_threshold.$touch()"
                        :error-messages="warn_dur_thresholdErrors">                        
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 pl-2 row v-if="selectedMbService.value == 'history_preciprisk?'">
            <v-layout row wrap>
                <v-flex xs12 class="pl-3 pr-3">
                    <p style="color: grey; font-size 8px;">
                        <b>Precipitation analysis:</b>
                        evaluates precipitation amounts in a week above a certain threshold. Similar to cold and warm events,
                        estimate strong precipitation events can be estimated for scheduling activities accordingly.
                    </p>
                </v-flex>
                <v-flex xs6 class="pl-3 pr-3">
                    <v-text-field hide-no-data hide-selected dense color="#77b942" type="text" v-model="prec_threshold" 
                        :value="prec_threshold" label="Precipitation threshold *" 
                        @input="$v.prec_threshold.$touch()" @blur="$v.prec_threshold.$touch()"
                        :error-messages="prec_thresholdErrors">                        
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 pl-2 row  v-if="selectedMbService.value == 'history_watercapacity?'">
            <v-layout row wrap>
                <v-flex xs12 class="pl-3 pr-3">
                    <p style="color: grey; font-size 8px;">
                        <b>Water capacity:</b>
                        estimated probability of remaining soil water amount. Select the maximum amount of soil water capacity depending on your soil and crop type.
                    </p>
                </v-flex>
                <v-flex xs6 class="pl-3 pr-3">
                    <v-text-field hide-no-data hide-selected dense color="#77b942" type="text" v-model="wat_cap_threshold" 
                        :value="wat_cap_threshold" label="Maximum available soil water capacity threshold *" 
                        @input="$v.wat_cap_threshold.$touch()" @blur="$v.wat_cap_threshold.$touch()"
                        :error-messages="wat_cap_thresholdErrors">                        
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 pl-2 row  v-if="selectedMbService.value == 'history_cloudcover?'">
            <v-layout row wrap>
                <v-flex xs12 class="pl-3 pr-3">
                    <p style="color: grey; font-size 8px;">
                        <b>Cloud cover:</b>
                        cloud free hours per day.
                    </p>
                </v-flex>
                <v-flex xs6 class="pl-3 pr-3">
                    <v-text-field hide-no-data hide-selected dense color="#77b942" type="text" v-model="cloud_cvr_threshold" 
                        :value="cloud_cvr_threshold" label="Cloud cover threshold % *" 
                        @input="$v.cloud_cvr_threshold.$touch()" @blur="$v.cloud_cvr_threshold.$touch()"
                        :error-messages="cloud_cvr_thresholdErrors">                        
                    </v-text-field>
                </v-flex>
            </v-layout>
        </v-flex>
                    
        <v-flex xs12 sm12 md12 lg12 class="text-xs-right mt-2" style="padding: 0px; margin-bottom: 5px;">
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
                <v-btn icon title="Download graphic" @click="downloadGraph()">
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

    </div>

</template>

<script>

import { required, numeric } from 'vuelidate/lib/validators'
import CONST from "../const";

export default {
    name: "ClimaticPatterns",    
    data: () => ({        
        climaticPatternsURL: CONST.climaticPatternsURL,
        climaticPatternsAPI_key: CONST.climaticPatternsAPI_key,
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
        }
        ],
        selectedMbService:"",
        cold_tmp_threshold: 1,
        cold_dur_threshold: 1,
        warn_tmp_threshold: 30,
        warn_dur_threshold: 1,
        prec_threshold: 30,
        wat_cap_threshold: 100,
        cloud_cvr_threshold: 15,
        isValid: false,        
        grahpURL: "",
        mbDialog: false,
        isLoading: false,
    }),
    methods: {
        /**
        * Create the url to acces the output mb diagram
        *
        * @param {string} service
        * @public
        */
        mbService(service){

            var self = this;
                                   
            var url = this.climaticPatternsURL.concat(service.value,
            '&lat=', this.$store.state.mapCoords.lat, '&lon=', this.$store.state.mapCoords.long, '&apikey=', this.climaticPatternsAPI_key);

            if(service.value === 'history_frostrisk?'){
                if(!this.$v.cold_tmp_threshold.$invalid && !this.$v.cold_dur_threshold.$invalid){
                    this.grahpURL = url.concat('&thr=', this.cold_tmp_threshold, '&frostlength=', this.cold_dur_threshold);
                    this.isValid = true;
                }else{
                    this.isValid = false;
                }                
            }else if (service.value === 'history_heatrisk?') {
                if(!this.$v.warn_tmp_threshold.$invalid && !this.$v.warn_dur_threshold.$invalid){
                    this.grahpURL = url.concat('&thr=', this.warn_tmp_threshold, '&frostlength=', this.warn_dur_threshold);
                    this.isValid = true;
                }else{
                    this.isValid = false;
                }                
            }else if (service.value === 'history_preciprisk?') {
                if(!this.$v.prec_threshold.$invalid){
                    this.grahpURL = url.concat('&thr=', this.prec_threshold);
                    this.isValid = true;
                }else{
                    this.isValid = false;
                }                
            }else if (service.value === 'history_watercapacity?') {
                if(!this.$v.wat_cap_threshold.$invalid){
                    this.grahpURL = url.concat('&thr=', this.wat_cap_threshold);
                    this.isValid = true;
                }else{
                    this.isValid = false;
                }                 
            }else if (service.value === 'history_cloudcover?') {
                if(!this.$v.cloud_cvr_threshold.$invalid){
                    this.grahpURL = url.concat('&thr=', this.cloud_cvr_threshold);
                    this.isValid = true;
                }else{
                    this.isValid = false;
                }                   
            }

            if(this.isValid){
                this.isLoading = true; 
                this.$http.get(this.graphURL).then(response => {                                    
                    setTimeout(function(){ 
                        self.isLoading = false;                                                 
                        self.$eventBus.$emit('show-alert', "success", response.statusText + ": Diagram retrieved successfully"); 
                        self.mbDialog = true;
                    }, 4000);                           
                }, response => {
                    this.isLoading = false;                    
                    this.$eventBus.$emit('show-alert', "error", response.statusText); 
                });
            }else{
                this.$eventBus.$emit('show-alert', "error", "Please insert correct values"); 
            }
        
        },//mbService
        /**
        * Open the image in other browser tab to force to be download
        *
        * @public
        */
        downloadGraph(){
            window.open(this.grahpURL)  
        },
        resetForm(){
            this.cold_tmp_threshold= 1
            this.cold_dur_threshold = 1
            this.warn_tmp_threshold = 30
            this.warn_dur_threshold = 1
            this.prec_threshold = 30
            this.wat_cap_threshold = 100
            this.cloud_cvr_threshold = 15
        }
    },    
    validations: {
        cold_tmp_threshold: {required, numeric},
        cold_dur_threshold: {required, numeric},
        warn_tmp_threshold: {required, numeric},
        warn_dur_threshold: {required, numeric},
        prec_threshold: {required, numeric},
        wat_cap_threshold: {required, numeric},
        cloud_cvr_threshold: {required, numeric},                  
    },
    computed: {
        cold_tmp_thresholdErrors () {
            const errors = []
            if (!this.$v.cold_tmp_threshold.$dirty) return errors
            !this.$v.cold_tmp_threshold.required && errors.push('Required field.')
            !this.$v.cold_tmp_threshold.numeric && errors.push('Insert a number')
            return errors
        },  
        cold_dur_thresholdErrors () {
            const errors = []
            if (!this.$v.cold_dur_threshold.$dirty) return errors
            !this.$v.cold_dur_threshold.required && errors.push('Required field.')
            !this.$v.cold_dur_threshold.numeric && errors.push('Insert a number')
            return errors
        },    
        warn_tmp_thresholdErrors () {
            const errors = []
            if (!this.$v.warn_tmp_threshold.$dirty) return errors
            !this.$v.warn_tmp_threshold.required && errors.push('Required field.')
            !this.$v.warn_tmp_threshold.numeric && errors.push('Insert a number')
            return errors
        },   
        warn_dur_thresholdErrors () {
            const errors = []
            if (!this.$v.warn_dur_threshold.$dirty) return errors
            !this.$v.warn_dur_threshold.required && errors.push('Required field.')
            !this.$v.warn_dur_threshold.numeric && errors.push('Insert a number')
            return errors
        },   
        prec_thresholdErrors () {
            const errors = []
            if (!this.$v.prec_threshold.$dirty) return errors
            !this.$v.prec_threshold.required && errors.push('Required field.')
            !this.$v.prec_threshold.numeric && errors.push('Insert a number')
            return errors
        },
        wat_cap_thresholdErrors () {
            const errors = []
            if (!this.$v.wat_cap_threshold.$dirty) return errors
            !this.$v.wat_cap_threshold.required && errors.push('Required field.')
            !this.$v.wat_cap_threshold.numeric && errors.push('Insert a number')
            return errors
        },  
        cloud_cvr_thresholdErrors () {
            const errors = []
            if (!this.$v.cloud_cvr_threshold.$dirty) return errors
            !this.$v.cloud_cvr_threshold.required && errors.push('Required field.')
            !this.$v.cloud_cvr_threshold.numeric && errors.push('Insert a number')
            return errors
        },                                
    },    

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


