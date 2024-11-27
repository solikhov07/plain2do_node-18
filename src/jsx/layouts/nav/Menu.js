export const MenuList = [
    //Dashboard
    {
        titleEN: 'Projects',
        titleRU:'Проекты',
        titleTR: "Projeler",	
        classsChange: 'mm-collapse',		
        iconStyle: <i className="flaticon-381-layer-1"></i>,
        content: [
            {
                titleEN: 'List Projects',
                titleRU: "Список проектов",
                titleTR: "Proje Listesi",
                to: 'projects',					
            },
            {
                titleEN: 'Budgets',
                titleRU: "Бюджеты",
                titleTR: "Bütçeler",
                to: 'budgets',
            },
            {
                titleEN: 'Gantt Chart',
                titleRU: "Диаграмма Гантт",
                titleTR: "Gantt Çizelgesi",
                to: 'gantt-chart',
            },
            {
                titleEN: 'Labor Demand List',
                titleRU: "Список потребностей в рабочей силе",
                titleTR: "İşgücü Talep Listesi",
                to: 'labor-demand',
            }, 
        ],
    },
    
    //CMS
    {
        titleEN: "My Tasks",
        titleRU: "Мои задачи",
        titleTR: "Görevlerim",
        classsChange: 'mm-collapse',
        update:"New",
        iconStyle: 
        <i className="flaticon-381-list-1"></i>,        
        content:[
            {
                titleEN:'Kanban Board',
                titleRU: "Доска Канбан",
                titleTR: "Kanban Panosu",
                to:'/kanban-board'
            },
            {
                titleEN:'Pending Tasks',
                titleRU: "Задачи в ожидании",
                titleTR: "Bekleyen Görevler",
                to:'/pending-tasks'
            },
        ],
    },
    //Apps
    {
        titleEN: 'Employee',
        titleRU: "Сотрудник",
        titleTR: "Çalışan",	
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-381-user-4"></i>,
        content: [
            {
                titleEN: 'Employee General List',
                titleRU: "Общий список сотрудников",
                titleTR: "Çalışan Listesi",
                to: 'employee-list'
            },
            // {
            //     title: 'Edit Profile',
            //     to: 'edit-profile'
            // },
            {
                titleEN: 'Timesheet',
                titleRU: "Табель учета рабочего времени",
                titleTR: "Puantaj",
                to: 'timesheet'
            },
            {
                titleEN: 'Payroll',
                titleRU: "Зарплатная ведомость",
                titleTR: "Maaş Bordrosu",
                to: 'payroll'
            },
        ],
    },
    //Charts
    {
        titleEN: 'Finance',
        titleRU: "Финансы",
        titleTR: "Finans",	
        classsChange: 'mm-collapse',
        iconStyle: <i className="flaticon-050-info"></i>,
        content: [
            {
                titleEN: 'Treasury',
                titleTR: "Hazine",
                titleRU: "Казначейство",
                to: 'treasury',					
            },
        ]
    },
    //Boosttrap
    {
        titleEN: "Dashboards",
        titleTR: "Panolar",
        titleRU: 'Панели управления',	
        classsChange: 'mm-collapse',
        iconStyle:<i className="flaticon-025-dashboard"></i>, //<i className="flaticon-025-dashboard"></i>	
        content: [
            {
                titleEN: "Statistics",
                titleTR: "İstatistikler",
                titleRU: "Статистика",
                to: 'statistics',					
            },
            {
                titleEN: "Analytical Reports",
                titleTR: "Analitik Raporlar",
                titleRU: "Аналитические отчеты",
                to: 'analytical-reports',		
            }
        ]
    },
]