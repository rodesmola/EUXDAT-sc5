<template>

    <v-card-text>

        <v-flex xs12  >

            <v-tabs centered color="green" dark grow>
                <v-tabs-slider color="#27304c"></v-tabs-slider>
                
                <v-tab href="#is">
                Field use recommendations scenario
                </v-tab>

                <v-tab href="#cp">
                Climatic Pattern changes scenario
                </v-tab>

                <v-tabs-items v-model="tab">

                    <v-tab-item :key="1" value="is">
                        <v-card flat class="pa-2">

                            <div style="margin-bottom: 15px; margin-top: 15px">
                                <img style="width: 160px; position: absolute; opacity: 0.2; bottom: 5px; right: 5px;" src="../assets/logo2.png" alt="">
                                <span class="title" style="color: #1e2f4d;">Information support for field use recommendations</span>
                            </div>                    
                            <p>
                                TManagement zones describe areas within a field that exhibit similar vegetation development. These occur due to within-field-differences in topography, 
                                soil type or texture, local climate, management strategies (stock). We aim to develop a method that would pre-select only cloud-free images from 
                                Sentinel-2 image and select this from start of the season when heterogeneities due to above parameters tend to be the highest. The user will then 
                                be asked to provide minimum and maximum fertilizer levels that will be distributed within the computed levels. The number of classes is flexible 
                                and will reflect the heterogeneity level. 
                            </p>
                            <p style="margin-bottom: 15px;">
                                The following list shows concrete applications, made possible by queries to the designed expert system. Note that all applications rely, 
                                among others, also on soil moisture in-situ data available from PESSL‘s instrumentation at various depths (10 to 100 cm). 
                                As so, these services can be provided only for fields where this or similar soil moisture instrumentation is installed:
                            </p>
                            <p>
                                <span class="title" style="color: #37aa48; font-size 12px;">
                                Phenological curve for a given field 
                                </span>
                            </p>
                            <p>
                                Each crop can be described with the phenological curve. Phenological curve describes periodic plant life cycle. Such cycle starts at the seeding 
                                and finishes with harvest for annual crops and with start of the season and end of the season for perennial crops. These cycles are influenced by 
                                seasonal and interannual variations in climate. This service provides a phenological curve for given user’s field with basic statistical 
                                information i.e. max biomass, DOY of the highest biomass increase and decrease. As such you may compare phenological performance of your crops 
                                in space and time.

                            </p>  
                            <p style="margin-left: 20px;">
                                <strong>Algorithm specifications: </strong> 
                            </p>
                            <p style="margin-left: 20px; margin-bottom: 15px;">   
                                Retrieve cloud-free scenes for a given field using FIS services and MUNDI WCS SCL service of level 2A product. While cloud information is available 
                                for each Sentinel2 scene, this represents the cloud percentage per entire 100x100km scene. We however need to know the cloud probability for given field.
                                 This is provided with help of the SCL cloud algorithm that can be acquired via WCS service.             
                            </p>
                            <p>
                                <span class="title" style="color: #37aa48; font-size 12px;">
                                Application map for fertilizer and spraying 
                                </span>
                            </p>
                            <p>
                                Management zones describe areas within a field that exhibit similar vegetation development. These occur due to within-field-differences in topography, 
                                soil type or texture, local climate, management strategies (stock). We aim to develop a method that would pre-select only cloud-free images from Sentinel-2 
                                image and select this from start of the season when heterogeneities due to above parameters tend to be the highest. The user will then be asked to provide 
                                minimum and maximum fertilizer levels that will be distributed within the computed levels. The number of classes is flexible and will reflect the heterogeneity level.
                            </p> 

                            <p style="margin-left: 20px;">
                                <strong>Algorithm specifications: </strong>
                            </p>   
                            <p style="margin-bottom: 5px; margin-left: 20px;">
                                <ul>
                                    <li>Retrieve cloud-free scenes for a given field using MUNDI WMS and FIS services and SNAP-based cloud detection algorithm.</li>
                                    <li>Compute the management zones using Jenks natural breaks optimization to determine the clusters and goodness of variance fit to determine the number 
                                        of classes needed. We assure that no bordering pixels are included in the analyses. For the first version, automatically select images from start of 
                                        the season representing 1.5 months. The minimum images should be 3. In the second version, allow user to select images on him/her own based on the 
                                        displayed phenological statistics). </li>
                                </ul>
                            </p>

                        </v-card>
                    </v-tab-item>

                    <v-tab-item :key="2" value="cp">
                        <v-card flat class="pa-2">
                                    
                            <div style="margin-bottom: 15px; margin-top: 15px">
                                <img style="width: 160px; position: absolute; opacity: 0.2; bottom: 5px; right: 5px;" src="../assets/logo2.png" alt="">
                                <span class="title" style="color: #1e2f4d;">Climate pattern changes</span>
                            </div> 
                            <p>
                                Today, climate change is affecting most areas in Europe. The magnitude of the changes
                                is not yet fully known, however, the variability over the past 10 to 30 years is rather precisely understood.
                                This system will allow an assessment of trends, frequency distribution and extremes
                                for the major weather-related variables (temperature, precipitation, evapotranspiration, soil moisture)
                                for agricultural zones. It can link to the other system.
                                The differences to existing climate databases will be the following:
                            </p>
                            <p>
                                <ul>
                                <li>Analysis will be focussed on crop land (filter).</li>
                                <li>Analysis will be focussed on cropping seasons (filter applicable for
                                    different crops, e.g. summer crops, winter crops, perennial crops).</li>
                                <li>Analysis will allow users to upload own records (e.g. temperature
                                    measurements) to benchmark regional model data.</li>
                                <li>The service can (but does not have to) link to existing climate
                                    change models which quantify future changes.</li>
                                </ul>
                            </p>
                            <p style="margin-bottom: 15px;">
                                This service will create a unique ability to assess potential impact of climate change on local production.
                            </p>
                            <p>
                                <span class="title" style="color: #37aa48; font-size 12px;">
                                Specifications
                                </span>
                            </p>
                            <p>
                                These extremes change over time, and the mapping exercise would consist of defining long-term indices for
                                change (frequency of frost or heat, heavy rainfall or drought, storms) and plotting them on maps.
                                Local detail is not of such concern in these maps, since large-scale frequency changes occur over longer periods
                                of time and larger areas and are not subject to local micro-climate.
                                Details must still be worked out, because this pattern change so far only uses weather input and does not
                                yet connect this input with other data. Options to enhance the service:
                            </p>
                            <p style="margin-bottom: 5px;">
                                <ul>
                                <li>Upload weather station data (for 1-2 years) to validate sources for long-term data.</li>
                                <li>Downscale simulations using topography/slope.</li>
                                <li>Integrate climate risk with soil data, e.g. impact of drought on soils with san, silt, clay, or peat content.</li>
                                <li>Insert crop growth thresholds to show impact of climate variations on different crops.</li>
                                <li>Simulate effect of climate on different crops (link to scenario 2).</li>
                                </ul>
                            </p>
                        </v-card>
                    </v-tab-item>                            
                                                
                </v-tabs-items>

            </v-tabs>             

        </v-flex>
    </v-card-text>

</template>

<script>
export default {
  name: "StartDialog",
   data: () => ({
       tab: "is",
    }),
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>