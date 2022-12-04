import { createApp } from 'vue';
import Popup from './components/PopupPage.vue';
import migrateUsers from './common/migrateUsers';

createApp(Popup).mount('#popup');
migrateUsers();
