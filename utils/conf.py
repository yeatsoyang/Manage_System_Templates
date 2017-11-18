#coding:utf-8
Menus = {
    'menus':[{'name':'业务菜单',
              'type':'mail',
              'key':'sub1',
              'children':[
                {'name':'业务菜单','key':'1'}
             ]},
             {'name':'后台管理',
              'type':'appstore',
              'key':'sub2',
              'children':[
                {'name':'用户管理','key':'5'},
                {'name':'组管理','key':'6'},
                {'name':'角色管理','key':'7'},
                {'name':'权限管理','key':'8'},
             ]}
    ]
}


Role_Menus = [
   # 1 营业厅管理员
   {'role':1, 'menus':[1,5,6,7,8]}
]



