import Vue from "vue";
import Router from "vue-router";

import Login from "./views/Login.vue";

import Homepage from "./views/Homepage.vue";
import HomepageStudent from "./views/HomepageStudent.vue";
import HomepageFaculty from "./views/HomepageFaculty.vue";
import HomepageAdmin from "./views/HomepageAdmin.vue";
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
import Maintain from "./views/Maintain.vue";
import MaintainAvailability from "./views/MaintainAvailability.vue";
import MaintainComposers from "./views/MaintainComposer.vue";
import MaintainEvents from "./views/MaintainEvent.vue";
import MaintainEventSessions from "./views/MaintainEventSession.vue";
import MaintainEventsStudent from "./views/MaintainEventStudent.vue";
import MaintainInstruments from "./views/MaintainInstrument.vue";
import MaintainLevels from "./views/MaintainLevel.vue";
import MaintainRoles from "./views/MaintainRole.vue";
import MaintainSongs from "./views/MaintainSong.vue";
import NotificationList from "./views/NotificationList.vue";
import ProfileIncomingStudent from "./views/ProfileIncomingStudent.vue";
import ProfileFaculty from "./views/ProfileFaculty.vue";
import ProfileStudent from "./views/ProfileStudent.vue";
import Repertoire from "./views/Repertoire.vue";
import SignupEvent from "./views/SignupEvent.vue";
import ViewStudents from "./views/ViewStudentsInstructor.vue";
import ViewStudentsEvent from "./views/ViewStudentsEvent.vue";


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
      path: "/homestudent",
      name: "homestudent",
      component: HomepageStudent,
    },
    {
      path: "/homefaculty",
      name: "homefaculty",
      component: HomepageFaculty,
    },
    {
      path: "/homeadmin",
      name: "homeadmin",
      component: HomepageAdmin,
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
      component: AddCritique,
      props: true
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
      path: "/critique/:eventSessionId",
      name: "critique",
      component: Critique,
      props: true
    },
    {
      path: "/critiqueview/:critiqueId",
      name: "critiqueview",
      component: CritiqueView,
      props: true
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
      path: "/maintain",
      name: "maintain",
      component: Maintain
    },
    {
      path: "/maintainavailability",
      name: "maintainavailability",
      component: MaintainAvailability,
      props: true
    },
    {
      path: "/maintaincomposer",
      name: "maintaincomposer",
      component: MaintainComposers
    },
    {
      path: "/maintainevent",
      name: "maintainevent",
      component: MaintainEvents,
      props: true
    },
    {
      path: "/maintaineventsession/:eventId",
      name: "maintaineventsession",
      component: MaintainEventSessions,
      props: true
    },
    {
      path: "/maintaineventstudent",
      name: "maintaineventstudent",
      component: MaintainEventsStudent
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
      path: "/notificationlist",
      name: "notificationlist",
      component: NotificationList
    },
    {
      path: "/profileincomingstudent",
      name: "profileincomingstudent",
      component: ProfileIncomingStudent,
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
      path: "/viewstudents",
      name: "viewstudents",
      component: ViewStudents
    },
    {
      path: "/viewstudentsevent",
      name: "viewstudentsevent",
      component: ViewStudentsEvent,
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
    }
  ],
});

export default router;