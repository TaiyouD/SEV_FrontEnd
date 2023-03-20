
import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login.vue";

import Homepage from "./views/Homepage.vue";
import SignupEvent from "./views/SignupEvent.vue";
import AddAccompanist from "./views/AddAccompanist.vue";
import AddComposer from "./views/AddComposer.vue";
import AddSongRepertoire from "./views/AddSongRepertoire.vue";
import EventUpcomingList from "./views/EventUpcomingList.vue";
import EventPastList from "./views/EventPastList.vue";
import EventEdit from "./views/EventEdit.vue";
import EventEvaluation from "./views/EventEvaluation.vue";
import Repertoire from "./views/Repertoire.vue";
import ProfileStudent from "./views/ProfileStudent.vue";
import ProfileFaculty from "./views/ProfileFaculty.vue";

import TutorialsList from "./views/TutorialsList.vue";
import EditTutorial from "./views/EditTutorial.vue";
import AddTutorial from "./views/AddTutorial.vue";
import ViewTutorial from "./views/ViewTutorial.vue";
import AddLesson from "./views/AddLesson.vue";
import EditLesson from "./views/EditLesson.vue";


// CRUD for Admin to maintain roles
import MaintainRoles from "./views/MaintainRole.vue";
import ViewComposers from "./views/ViewComposer.vue";
import AddComposers from "./views/AddComposer.vue";
import EditComposers from "./views/EditComposer.vue";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  linkExactActiveClass: "active",
  base:
    //    process.env.NODE_ENV === 'development'? "/" : "/tutorScheduling/", - for AWS
    process.env.NODE_ENV === "development" ? "/" : "/performance/t4",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: Homepage,
    },
    {
      path: "/signupevents",
      name: "signupevents",
      component: SignupEvent,
    },
    {
      path: "/addcomposer",
      name: "addcomposer",
      component: AddComposer
    },
    {
      path: "/addaccompanist",
      name: "addaccompanist",
      component: AddAccompanist
    },
    {
      path: "/addsong",
      name: "addsong",
      component: AddSongRepertoire,
      //props: true
    },
    {
      path: "/eventupcoming",
      name: "eventupcoming",
      component: EventUpcomingList,
    },
    {
      path: "/eventpast",
      name: "eventpast",
      component: EventPastList,
      props: true,
    },
    {
      path: "/eventedit",
      name: "eventedit",
      component: EventEdit,
    },
    {
      path: "/eventevaluation",
      name: "eventevaluation",
      component: EventEvaluation,
    },
    {
      path: "/repertoire",
      name: "repertoire",
      component: Repertoire,
      props: true,
    },
    {
      path: "/profilestudent",
      name: "profilestudent",
      component: ProfileStudent,
      props: true,
    },
    {
      path: "/profilefaculty",
      name: "profilefaculty",
      component: ProfileFaculty,
      props: true,
    },
    {
      path: "/tutorials",
      name: "tutorials",
      component: TutorialsList,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: EditTutorial,
      props: true,
    },
    {
      path: "/add",
      name: "add",
      component: AddTutorial,
    },
    {
      path: "/view/:id",
      name: "view",
      component: ViewTutorial,
      props: true,
    },
    {
      path: "/addLesson/:tutorialId",
      name: "addLesson",
      component: AddLesson,
      props: true,
    },
    {
      path: "/editLesson/:tutorialId/:lessonId",
      name: "editLesson",
      component: EditLesson,
      props: true,
    },
    {
      path: "/maintainrole",
      name: "maintainrole",
      component: MaintainRoles
    },
    {
      path: "/viewcomposer",
      name: "viewcomposer",
      component: ViewComposers
    },
    {
      path: "/addcomposer",
      name: "addcomposer",
      component: AddComposers
    },
    {
      path: "/editcomposer",
      name: "editcomposer",
      component: EditComposers,
      props: true
    },
  ],
});

export default router;
