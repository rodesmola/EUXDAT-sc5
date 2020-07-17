<template>
    <v-flex xs12 pl-2 row class="hidden-md-and-down">
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
                <v-text-field color="#5cb860" :value="endDate" slot="activator" label="End date*"
                :rules="inputDateRules" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker ref="picker" v-model="endDate" scrollable color="#5cb860" first-day-of-week="1"
                :max="new Date().toISOString().substr(0, 10)" min="1985-01-01" @change="saveEndDate">
            </v-date-picker>
            </v-menu>
        </v-flex>   

        <v-flex xs12 sm12 md12 lg12 class="text-xs-right" style="padding: 0px; margin-bottom: 5px;">
            <v-btn small dark round color="#27304c"  title="Run service" >
                RUN
            </v-btn>
        </v-flex>
        
    </v-flex> 
</template>

<script>
export default {
    name: "PhenologicCurve",
    props: {},
    data: () => ({
        inputDateRules: [
        v => !!v || ''
        ],
        startDate: "2020-01-01",
        endDate: "2020-12-31",
        menuStartDate: false,
        menuEndDate: false,
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


