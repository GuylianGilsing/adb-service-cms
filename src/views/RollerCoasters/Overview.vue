<template>
    <main id="main-content">
        <section>
            <div class="container">
                <div class="row">
                    <div class="col-100">
                        <h3>All RollerCoasters</h3>
                        <RollerCoasterOverviewTable
                            ref="overviewTable"

                            :rollerCoasters="rollerCoasters"

                            v-on:delete-rollercoaster="deleteRollerCoaster"
                        />
                    </div>
                </div>
                <div class="row mt-1">
                    <div class="col-100">
                        <router-link to="/rollercoasters/new" class="btn btn--primary">Create new</router-link>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import RollerCoasterOverviewTable from '@/components/RollerCoasterOverviewTable.vue';

import RollerCoasterService from '../../services/RollerCoasterService';

const rollercoasterService = new RollerCoasterService();

export default {
    name: 'Overview',
    components: {
        RollerCoasterOverviewTable
    },
    data()
    {
        return {
            rollerCoasters: [],
        };
    },
    methods: {
        async getRollerCoasters()
        {
            this.$refs.overviewTable.startPreloading();
            this.$data.rollerCoasters = await rollercoasterService.getAll();
            this.$refs.overviewTable.stopPreloading();

            console.log(this.$data.rollerCoasters);
        },
        async deleteRollerCoaster(data)
        {
            const id = data.rollerCoasterID;
            const rowId = data.rowId;

            if(!confirm('Are you sure that you want to delete this RollerCoaster?'))
                return;

            this.$refs.overviewTable.markRowForDelete(rowId);

            const coasterHasBeenDeleted = await rollercoasterService.delete(id);
            this.$refs.overviewTable.unmarkRowForDelete(rowId);

            if(coasterHasBeenDeleted)
            {
                this.$data.rollerCoasters.splice(rowId, 1);
                console.log(this.$data.rollerCoasters);
                return;
            }

            alert('Could not delete RollerCoaster');
        },
    },
    mounted()
    {
        this.getRollerCoasters();
    }
}
</script>
