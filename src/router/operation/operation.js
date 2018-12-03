const reviewList = {
    path:'/operation/index',
    name:'reviewlist',
    meta:{
        index:2,
        title:'运营列表'
    },
    component:()=>import("@/pages/operation/doctorReview/list")
}
const reviewList1 = {
    path:'/operation/list1',
    name:'reviewlist1',
    meta:{
        index:2,
        title:'审核列表1'
    },
    component:()=>import("@/pages/operation/doctorReview/list1")
}
const reviewList2 = {
    path:'/operation/list2',
    name:'reviewlist2',
    meta:{
        index:2,
        title:'审核列表2'
    },
    component:()=>import("@/pages/operation/doctorReview/list2")
}
const reviewList3 = {
    path:'/operation/list3',
    name:'reviewlist3',
    meta:{
        index:2,
        title:'审核列表3'
    },
    component:()=>import("@/pages/operation/doctorReview/list3")
}
export default {
    reviewList,
    reviewList1,
    reviewList2,
    reviewList3
}