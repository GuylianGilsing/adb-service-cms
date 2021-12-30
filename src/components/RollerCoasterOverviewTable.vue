<template>
    <table data-ut="table-rollercoaster-overview" class="table">
        <thead class="table__head">
            <th class="table__heading">Name</th>
            <th class="table__heading">Park</th>
            <th class="table__heading">Actions</th>
        </thead>
        <tbody class="table__body">
            <tr v-show="preloading" class="table__row table__row--table-preloading">
                <td colspan="3" class="txt--align-center">
                    <div class="preloader preloader--spinner-blue"></div>
                    <div class="mt-0_5">Loading RollerCoasters...</div>
                </td>
            </tr>
            <tr v-show="!Array.isArray(rollerCoasters) || (rollerCoasters.length == 0 && !preloading)" class="table__row table__row--table-empty">
                <td colspan="3" class="txt--align-center">No RollerCoasters found</td>
            </tr>
            <template v-if="!preloading && Array.isArray(rollerCoasters) && rollerCoasters.length > 0">
                <tr v-for="(rollerCoaster, index) in rollerCoasters" :key="rollerCoaster.id" class="table__row" :class="{'table__row--deleting': deletingRows.includes(index)}">
                    <td>{{ rollerCoaster.name }}</td>
                    <td>{{ rollerCoaster.park }}</td>
                    <td class="table__actions">
                        <router-link :to="`/rollercoasters/${rollerCoaster.id}`">edit</router-link>
                        <div @click="emitDeleteRowEvent(rollerCoaster.id, index)" class="table__action-delete">delete</div>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'RollerCoasterOverviewTable',
    props: ["rollerCoasters"],
    data()
    {
        return {
            preloading: false,
            deletingRows: []
        };
    },
    methods: {
        startPreloading()
        {
            this.$data.preloading = true;
        },
        stopPreloading()
        {
            this.$data.preloading = false;
        },
        emitDeleteRowEvent(rollerCoasterID, rowId)
        {
            this.$emit('delete-rollercoaster', {rollerCoasterID, rowId});
        },
        markRowForDelete(rowId)
        {
            if(this.$data.deletingRows.includes(rowId))
                return;

            this.$data.deletingRows.push(rowId);
        },
        unmarkRowForDelete(rowId)
        {
            if(!this.$data.deletingRows.includes(rowId))
                return;

            while(this.$data.deletingRows.includes(rowId))
            {
                let rowIdToDelete = -1;

                for(let i = 0; i < this.$data.deletingRows.length; i += 1)
                {
                    if(this.$data.deletingRows[i] == rowId)
                    {
                        rowIdToDelete = i;
                        break;
                    }
                }

                if(rowIdToDelete >= 0)
                    this.$data.deletingRows.splice(rowIdToDelete, 1);
            }
        }
    }
}
</script>
