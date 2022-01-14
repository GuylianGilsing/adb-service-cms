<template>
    <main id="main-content">
        <section>
            <div class="container">
                <div class="row mb-1">
                    <div class="col-100">
                        <router-link to="/rollercoasters" class="btn btn--primary">Back</router-link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-50">TODO:: Image picker goes here...</div>
                    <div class="col-50">
                        <div class="input-field-wrapper input-field-wrapper--two-fields">
                            <div class="input-field" :class="{'input-field--error': fieldErrors.name.length > 0}">
                                <label for="attr-name" class="input-field__label">{{ fieldErrors.name.length > 0 ? fieldErrors.name[0] : 'Name' }}</label>
                                <input id="attr-name" type="text" class="input-field__field" placeholder="Attraction name here..." v-model="rollerCoaster.name">
                            </div>
                            <div class="input-field" :class="{'input-field--error': fieldErrors.park.length > 0}">
                                <label for="attr-park" class="input-field__label">{{ fieldErrors.park.length > 0 ? fieldErrors.park[0] : 'Park' }}</label>
                                <input id="attr-park" type="text" class="input-field__field" placeholder="Park name here..." v-model="rollerCoaster.park">
                            </div>
                        </div>
                        <div class="input-field">
                            <label for="attr-description" class="input-field__label">Description</label>
                            <textarea id="attr-description" rows="10" class="input-field__field" placeholder="Attraction description here..." v-model="rollerCoaster.description"></textarea>
                        </div>
                        <div class="input-field-table">
                            <div class="input-field-table__title">General information</div>
                            <div class="input-field-table__row">
                                <div class="input-field">
                                    <label for="attr-opening_date" class="input-field__label">Openingdate:</label>
                                    <input id="attr-opening_date" type="date" class="input-field__field" placeholder="Openingdate here..." v-model="rollerCoaster.openingDate">
                                </div>
                            </div>
                            <div class="input-field-table__row">
                                <div class="input-field">
                                    <label for="attr-status" class="input-field__label">Status:</label>
                                    <select id="attr-status" class="input-field__field" v-model="rollerCoaster.status">
                                        <option v-for="status in statusses.attraction" :value="status.id" :key="status.id">{{ status.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="input-field-table__row">
                                <div class="input-field">
                                    <label for="attr-country" class="input-field__label">Country:</label>
                                    <input id="attr-country" type="text" class="input-field__field" placeholder="Country here..." v-model="rollerCoaster.country">
                                </div>
                            </div>
                            <div class="input-field-table__row">
                                <div class="input-field">
                                    <label for="attr-height" class="input-field__label">Height:</label>
                                    <input id="attr-height" type="number" class="input-field__field" placeholder="Height here..." v-model="rollerCoaster.height">
                                </div>
                            </div>
                            <div class="input-field-table__row">
                                <div class="input-field">
                                    <label for="attr-speed" class="input-field__label">Speed:</label>
                                    <input id="attr-speed" type="text" class="input-field__field" placeholder="Speed here..." v-model="rollerCoaster.speed">
                                </div>
                            </div>
                            <div class="input-field-table__row">
                                <div class="input-field">
                                    <label for="attr-elements" class="input-field__label">Elements:</label>
                                    <input id="attr-elements" type="text" class="input-field__field" placeholder="Elements here..." v-model="rollerCoaster.elements">
                                </div>
                            </div>
                            <div class="input-field-table__row">
                                <div class="input-field">
                                    <label for="attr-inversions" class="input-field__label">Inversions:</label>
                                    <input id="attr-inversions" type="text" class="input-field__field" placeholder="Inversions here..." v-model="rollerCoaster.inversions">
                                </div>
                            </div>
                        </div>
                        <div class="input-field-table">
                            <div class="input-field-table__title">Technical information</div>
                            <div class="input-field-table__row" v-for="(techInfo, index) in rollerCoaster.technicalInformation" :key="index">
                                <div class="input-field">
                                    <label :for="`attr-${techInfo.name}`" class="input-field__label">{{ technicalInformationFieldNames[techInfo.name] }}:</label>
                                    <input :id="`attr-${techInfo.name}`" :type="technicalInformationFieldTypes[techInfo.name]" class="input-field__field" :placeholder="`${technicalInformationFieldNames[techInfo.name]} here...`" v-model="techInfo.value">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!isUpdateRoute" class="row create">
                    <div class="col-100 txt--align-center space--top-small">
                        <div v-if="fieldErrors.name.length > 0 && fieldErrors.park.length > 0" class="txt--color-error font--weight-semi-bold mb-1">Some fields aren't filled in correctly</div>
                        <div v-if="processErrors.create.length > 0" class="txt--color-error font--weight-semi-bold mb-1">{{ processErrors.create[0] }}</div>
                        <button class="btn btn--primary" @click="Create">
                            <template v-if="!preloaders.saveButton">Create</template>
                            <template v-else>
                                <div class="preloader preloader--spinner"></div>
                            </template>
                        </button>
                    </div>
                </div>
                <div v-else class="row update">
                    <div class="col-100 txt--align-center space--top-small">
                        <div v-if="fieldErrors.name.length > 0 && fieldErrors.park.length > 0" class="txt--color-error font--weight-semi-bold mb-1">Some fields aren't filled in correctly</div>
                        <div v-if="processErrors.update.length > 0" class="txt--color-error font--weight-semi-bold mb-1">{{ processErrors.update[0] }}</div>
                        <div v-if="processSuccess.update.length > 0" class="txt--color-success font--weight-semi-bold mb-1">{{ processSuccess.update[0] }}</div>
                        <button class="btn btn--primary" @click="Update">
                            <template v-if="!preloaders.updateButton">Save</template>
                            <template v-else>
                                <div class="preloader preloader--spinner"></div>
                            </template>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import RollerCoasterService from '../../services/RollerCoasterService';
import RollerCoasterValidator from '../../functions/Validators/RollerCoasterValidator';
import AttractionStatus from '../../enums/AttractionStatus.js';
import propertyMapper from './../../functions/Mappers/PropertyMapper';

const validator = new RollerCoasterValidator();
const service = new RollerCoasterService();

export default {
    name: 'Home',
    data()
    {
        return {
            isUpdateRoute: false,
            preloaders: {
                saveButton: false,
                updatebutton: false
            },
            statusses: {
                attraction: AttractionStatus.getAll()
            },
            fieldErrors: {
                name: [],
                park: []
            },
            processErrors: {
                create: [],
                update: []
            },
            processSuccess: {
                update: []
            },
            rollerCoaster: {
                name: '',
                description: '',
                authorId: 1,
                openingDate: '',
                status: AttractionStatus.OPERATIONAL.id,
                park: '',
                country: '',
                height: '',
                speed: '',
                elements: '',
                inversions: '',
                technicalInformation: [
                    {
                        id: 0,
                        name: 'coasterType',
                        value: ''
                    },
                    {
                        id: 0,
                        name: 'manufacturer',
                        value: ''
                    },
                    {
                        id: 0,
                        name: 'trackLength',
                        value: 0
                    },
                    {
                        id: 0,
                        name: 'rideDuration',
                        value: 0.00
                    },
                    {
                        id: 0,
                        name: 'capacity',
                        value: 0
                    },
                    {
                        id: 0,
                        name: 'gForces',
                        value: 0
                    },
                    {
                        id: 0,
                        name: 'trainType',
                        value: ''
                    },
                    {
                        id: 0,
                        name: 'amountOfCartsPerTrain',
                        value: 0
                    },
                    {
                        id: 0,
                        name: 'amountOfSeatsPerTrain',
                        value: 0
                    },
                    {
                        id: 0,
                        name: 'amountOfTrains',
                        value: 0
                    }
                ]
            },
            technicalInformationFieldTypes: {
                coasterType: 'text',
                manufacturer: 'text',
                trackLength: 'text',
                rideDuration: 'number',
                capacity: 'number',
                gForces: 'number',
                trainType: 'text',
                amountOfCartsPerTrain: 'number',
                amountOfSeatsPerTrain: 'number',
                amountOfTrains: 'number'
            },
            technicalInformationFieldNames: {
                coasterType: 'Coaster type',
                manufacturer: 'Manufacturer',
                trackLength: 'Track length',
                rideDuration: 'Ride duration',
                capacity: 'Capacity',
                gForces: 'G-Forces',
                trainType: 'Train type',
                amountOfCartsPerTrain: 'Carts per train',
                amountOfSeatsPerTrain: 'Seats per train',
                amountOfTrains: 'Amount of trains'
            }
        }
    },
    methods: {
        setInternalIsUpdatePage(id)
        {
            const numericId = Number.parseInt(id);

            if(!Number.isNaN(numericId) && Number.isInteger(numericId))
            {
                this.$data.isUpdateRoute = true;
                this.$data.rollerCoaster.id = numericId;
                return;
            }

            this.$data.isUpdateRoute = false;
        },
        async getRollerCoasterData()
        {
            const fetchedRollerCoaster = await service.get(this.$data.rollerCoaster.id);
            propertyMapper.map(fetchedRollerCoaster, this.$data.rollerCoaster);
        },
        async Create()
        {
            this.$data.preloaders.saveButton = true;
            this.$data.processErrors.create = [];
            
            validator.reset();
            this.$data.fieldErrors = validator.getErrors();

            if(!validator.fieldsAreValid(this.$data.rollerCoaster))
            {
                this.$data.fieldErrors = validator.getErrors();
                this.$data.preloaders.saveButton = false;
                return;
            }

            const createdRollerCoaster = await service.create(this.$data.rollerCoaster);
            this.$data.preloaders.saveButton = false;

            if(createdRollerCoaster == null)
            {
                if(service.hasGeneralError())
                    this.$data.processErrors.create = [service.getGeneralError()];

                if(service.hasFieldErrors())
                    this.$data.fieldErrors = service.getFieldErrors();
                
                return;
            }

            this.$router.push(`/rollercoasters/${createdRollerCoaster.id}`);
        },
        async Update()
        {
            this.$data.preloaders.updateButton = true;
            this.$data.processErrors.update = [];
            this.$data.processSuccess.update = [];
            
            validator.reset();
            this.$data.fieldErrors = validator.getErrors();

            if(!validator.fieldsAreValid(this.$data.rollerCoaster))
            {
                this.$data.fieldErrors = validator.getErrors();
                this.$data.preloaders.updateButton = false;
                return;
            }

            const updatedRollerCoaster = await service.update(this.$data.rollerCoaster);
            this.$data.preloaders.updateButton = false;

            if(updatedRollerCoaster == null)
            {
                if(service.hasGeneralError())
                    this.$data.processErrors.update = [service.getGeneralError()];

                if(service.hasFieldErrors())
                    this.$data.fieldErrors = service.getFieldErrors();
                
                return;
            }

            this.$data.processSuccess.update = ['Rollercoaster has been updated'];

            setTimeout(() => {
                this.$data.processSuccess.update = [];
            }, 5000);
        },
    },
    updated()
    {
        this.setInternalIsUpdatePage(this.$route.params.id);
    },
    mounted()
    {
        this.$data.preloaders.saveButton = false;
        this.$data.preloaders.updateButton = false;

        this.setInternalIsUpdatePage(this.$route.params.id);

        if(this.$data.isUpdateRoute)
        {
            this.getRollerCoasterData();
        }
    }
}
</script>
