import { createApp } from 'vue';
import Popup from './components/PopupComponent.vue';
import migrateUsers from './common/migrateUsers';

createApp(Popup).mount('#popup');
migrateUsers();