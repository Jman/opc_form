import { createApp } from 'vue';
import './scss/main.scss';
import Options from './components/OptionsPage.vue';
import migrateUsers from './common/migrateUsers';

createApp(Options).mount('#options');
migrateUsers();
