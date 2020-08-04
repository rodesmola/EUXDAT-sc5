<template>
    <v-flex xs12 row>
        <UserPolygons/>
    </v-flex> 
</template>

<script>
import UserPolygons from '@/components/UserPolygons.vue'

export default {
    name: "ManagementZone",
    components: {
        UserPolygons
    },
    props: {},
    data: () => ({
    }),
    watch: {
    },
    methods: {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
