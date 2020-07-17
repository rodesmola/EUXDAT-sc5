<template>

    <v-card-text>
        <v-flex xs12>
            <v-card flat>
                <v-card-text>

                <div style="margin-bottom: 15px">
                    <img style="width: 160px; position: absolute; opacity: 0.2; bottom: 70px; right: 5px;" src="../assets/logo2.png" alt="">
                    <span class="title" style="color: #1e2f4d;">Information support for field use recommendations</span>
                </div>                    
                <p>
                    The designed system will link spatial datasets (weather, soil data, and land cover type, management
                    zones) to provide actual use recommendations and past compliance checks for single field and crops.
                    This information is important for planning of management operations in the field such as:
                </p>
                <p>
                    <ul>
                    <li>Accessibility of the field with heavy equipment like harvester, manure spreader or base fertiliser spreader.</li>
                    <li>Crop protection recommendation.</li>
                    <li>Generation of application maps for fertilizer application.</li>
                    </ul>
                </p>

                <p>
                    <span class="title" style="color: #37aa48; font-size 12px;">
                    Specifications
                    </span>
                </p>
                <p>
                    The following list shows concrete applications, made possible by queries to the designed expert system.
                    Note that all applications rely, among others, also on soil moisture in-situ data available from PESSL‘s
                    instrumentation at various depths (10 to 100 cm). As so, these services can be provided only for fields
                    where this or similar soil moisture instrumentation is installed.
                </p>
                </v-card-text>

            </v-card>
        </v-flex>
    </v-card-text>

</template>

<script>
export default {
  name: "StartDialog",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>