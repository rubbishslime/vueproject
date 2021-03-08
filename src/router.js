import Vue from 'vue'
import Router from 'vue-router'
//组件模块
import corporationManagement from '@c/corporationManagement'
import memberManagement from '@c/memberManagement'
import forumManagement from '@c/forumManagement'
import activitiesManagement from '@c/activitiesManagement'
import myInfo from "@c/myInfo";
import index from "@c/index"
import forum from "@c/forum"
import square from "@c/square"
import add from "@c/add"
import cut from "@c/cut"
import userManagement from "@c/userManagement"
import addInfo from "@c/addInfo"
import examine from "@c/examine"
import addactivity from "@c/addactivity"
import addMessage from "@c/addMessage"
import information from "@c/information"
import activity from "@c/activity"
import login from "./login"
Vue.use(Router)

const router = new Router({
    routes: [
        {path: '/home', name: 'index', component: index,
        children: [
        { path: 'corporationManagement', name: 'corporationManagement', component: corporationManagement },
        { path: 'myInfo', name: 'myInfo', component: myInfo },
        { path: '/', name: 'square', component: square },
        { path: 'forum', name: 'forum', component: forum },
        { path: 'add', name: 'add', component: add },
        { path: 'examine', name: 'examine', component: examine },
        { path: 'cut', name: 'cut', component: cut },
        { path: 'userManagement', name: 'userManagement', component: userManagement },
        { path: 'activity', name: 'activity', component: activity },
        { path: 'addInfo', name: 'addInfo', component: addInfo },
        { path: 'addMessage', name: 'addMessage', component: addMessage },
        { path: 'addactivity', name: 'addactivity', component: addactivity },
        { path: 'information', name: 'information', component: information },
        { path: 'memberManagement',  name: 'memberManagement', component: memberManagement},
        { path: 'forumManagement',  name: 'forumManagement', component: forumManagement},
        { path: 'activitiesManagement',  name: 'activitiesManagement', component: activitiesManagement}
    ]
        },
        {path: '/', name: 'login', component: login}
    ],
    mode: 'history'
});
export default router;