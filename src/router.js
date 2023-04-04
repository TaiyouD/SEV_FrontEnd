
import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login.vue";

import Homepage from "./views/Homepage.vue";
import AddAccompanist from "./views/AddAccompanist.vue";
import AddComposers from "./views/AddComposer.vue";
import AddCritique from "./views/AddCritique.vue";
import AddEvent from "./views/AddEvent.vue";
import AddInstruments from "./views/AddInstrument.vue";
import AddRoles from "./views/AddRole.vue";
import AddSongs from "./views/AddSong.vue";
import AddSongRepertoire from "./views/AddSongRepertoire.vue";
import Critique from "./views/Critique.vue";
import CritiqueView from "./views/CritiqueView.vue";
import EditComposers from "./views/EditComposer.vue";
import EditEvents from "./views/EditEvent.vue";
import EditInstruments from "./views/EditInstrument.vue";
import EditLevels from "./views/EditLevel.vue";
import EditRoles from "./views/EditRole.vue";
import EditSongs from "./views/EditSong.vue";
import EventEvaluation from "./views/EventEvaluation.vue";
import EventPastList from "./views/EventPastList.vue";
import EventUpcomingList from "./views/EventUpcomingList.vue";
import EventView from "./views/EventView.vue";
import Maintain from "./views/Maintain.vue";
import MaintainComposers from "./views/MaintainComposer.vue";
import MaintainEvents from "./views/MaintainEvent.vue";
import MaintainInstruments from "./views/MaintainInstrument.vue";
import MaintainLevels from "./views/MaintainLevel.vue";
import MaintainRoles from "./views/MaintainRole.vue";
import MaintainSongs from "./views/MaintainSong.vue";
import ProfileAdmin from "./views/ProfileAdmin.vue";
import ProfileFaculty from "./views/ProfileFaculty.vue";
import ProfileStudent from "./views/ProfileStudent.vue";
import Repertoire from "./views/Repertoire.vue";
import SignupEvent from "./views/SignupEvent.vue";


import TutorialsList from "./views/TutorialsList.vue";
import EditTutorial from "./views/EditTutorial.vue";
import AddTutorial from "./views/AddTutorial.vue";
import ViewTutorial from "./views/ViewTutorial.vue";
import AddLesson from "./views/AddLesson.vue";
import EditLesson from "./views/EditLesson.vue";


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
      path: "/addaccompanist",
      name: "addaccompanist",
      component: AddAccompanist
    },
    {
      path: "/addcomposer",
      name: "addcomposer",
      component: AddComposers
    },
    {
      path: "/addcritique",
      name: "addcritique",
      component: AddCritique
    },
    {
      path: "/addevent",
      name: "addevent",
      component: AddEvent
    },
    {
      path: "/addinstrument",
      name: "addinstrument",
      component: AddInstruments
    },
    {
      path: "/addrole",
      name: "addrole",
      component: AddRoles
    },
    {
      path: "/addsong",
      name: "addsong",
      component: AddSongs
    },
    {
      path: "/addpiecerepertoire",
      name: "addpiecerepertoire",
      component: AddSongRepertoire,
    },
    {
      path: "/critique",
      name: "critique",
      component: Critique,
    },
    {
      path: "/critiqueview",
      name: "critiqueview",
      component: CritiqueView,
    },
    {
      path: "/editcomposer",
      name: "editcomposer",
      component: EditComposers,
      props: true
    },
    {
      path: "/editevent",
      name: "editevent",
      component: EditEvents,
      props: true
    },
    {
      path: "/editinstrument",
      name: "editinstrument",
      component: EditInstruments,
      props: true
    },
    {
      path: "/editrole",
      name: "editrole",
      component: EditRoles,
      props: true
    },
    {
      path: "/editsong",
      name: "editsong",
      component: EditSongs,
      props: true
    },
    {
      path: "/eventevaluation",
      name: "eventevaluation",
      component: EventEvaluation,
    },
    {
      path: "/editlevel",
      name: "editlevel",
      component: EditLevels,
      props: true
    },
    {
      path: "/eventpast",
      name: "eventpast",
      component: EventPastList,
      props: true,
    },
    {
      path: "/eventupcoming",
      name: "eventupcoming",
      component: EventUpcomingList,
    },
    {
      path: "/eventview",
      name: "eventview",
      component: EventView
    },
    {
      path: "/maintain",
      name: "maintain",
      component: Maintain
    },
    {
      path: "/maintaincomposer",
      name: "maintaincomposer",
      component: MaintainComposers
    },
    {
      path: "/maintainevent",
      name: "maintainevent",
      component: MaintainEvents
    },
    {
      path: "/maintaininstrument",
      name: "maintaininstrument",
      component: MaintainInstruments
    },
    {
      path: "/maintainlevel",
      name: "maintainlevel",
      component: MaintainLevels
    },
    {
      path: "/maintainrole",
      name: "maintainrole",
      component: MaintainRoles
    },
    {
      path: "/maintainsong",
      name: "maintainsong",
      component: MaintainSongs
    },
    {
      path: "/profileadmin",
      name: "profileadmin",
      component: ProfileAdmin,
      props: true,
    },
    {
      path: "/profilefaculty",
      name: "profilefaculty",
      component: ProfileFaculty,
      props: true,
    },
    {
      path: "/profilestudent",
      name: "profilestudent",
      component: ProfileStudent,
      props: true,
    },
    {
      path: "/repertoire",
      name: "repertoire",
      component: Repertoire,
      props: true,
    },
    {
      path: "/signupevents",
      name: "signupevents",
      component: SignupEvent,
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
    }
  ],
});

export default router;