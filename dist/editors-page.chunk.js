(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{617:function(e,t,a){"use strict";a.r(t);var l=a(34),r=(a(69),a(32)),i=(a(99),a(392)),s=(a(384),a(371)),n=(a(370),a(351)),o=(a(372),a(375)),d=(a(373),a(103)),c=(a(202),a(10)),u=a(0),m=a(27),g=a(378);t.default=s.a.create()(e=>{const t=u.useContext(m.b);if(!t)throw new Error("Store is null");const a=Object(c.a)(()=>({handleSubmit:function(a){a.preventDefault(),a.stopPropagation();let{selectedPage:l}=t;e.form.validateFieldsAndScroll((e,t)=>{e||(o.a.info({message:`Page - ${l.name}`,description:"Page properties applied successfully"}),Object.keys(t).forEach(e=>{l[e]=t[e]}))})},hasErrors:function(){let t=e.form.getFieldsError();return Object.keys(t).filter(e=>!!t[e]).length>0}}));return Object(c.b)(()=>t.showPageEditor&&t.selectedPage&&u.createElement(i.a,{title:`Page "${t.selectedPage.name}" (id=${t.selectedPage.id||""})`,onClose:()=>t.setEditable(null),visible:t.showPageEditor,width:600,closable:!a.hasErrors(),maskClosable:!a.hasErrors(),style:{overflow:"auto",paddingBottom:"108px"}},u.createElement(d.a,null,u.createElement(d.a.TabPane,{key:"1",tab:"Settings"},u.createElement(r.a,{size:"small",bordered:!1},u.createElement(s.a,Object.assign({},g.a,{onSubmit:e=>a.handleSubmit(e),layout:"horizontal"}),u.createElement(s.a.Item,{required:!0,label:"Name",help:"Choose a name that distinguishes this page from others"},e.form.getFieldDecorator("name",{initialValue:t.selectedPage.name,rules:[{type:"string"},{required:!0,message:"A name is required"}]})(u.createElement(n.default,null))),u.createElement(s.a.Item,{required:!0,label:"Title",help:"The title of this page, displayed above the page's content"},e.form.getFieldDecorator("title",{initialValue:t.selectedPage.title,rules:[{type:"string"},{required:!0,message:"A title is required"}]})(u.createElement(n.default,null))),u.createElement(s.a.Item,{label:"Subtitle",help:"A subtitle for this page, displayed underneath the title"},e.form.getFieldDecorator("subtitle",{initialValue:t.selectedPage.subtitle,rules:[{type:"string"}]})(u.createElement(n.default,null))),u.createElement(s.a.Item,Object.assign({},g.b),u.createElement(l.a,{type:"primary",htmlType:"submit",style:{marginTop:"15px"},onClick:a.handleSubmit},"Apply"))))))))})}}]);
//# sourceMappingURL=editors-page.chunk.js.map