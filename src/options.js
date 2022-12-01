import { createApp } from 'vue';
import './scss/main.scss';
import Options from './components/OptionsComponent.vue';
import migrateUsers from './common/migrateUsers';

createApp(Options).mount('#options');
migrateUsers();
