import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },

  {
    title: true,
    name: 'Modulo de Administracion de Centros'
  },
  {
    name: 'Parametros',
    url: '/administration-garden',
    iconComponent: { name: 'cil-settings' },
    badge: {
      color: 'info',
      text: 'NEW'
    },
    children: [
      {
        name: 'Ciudades',
        url: '/administration-garden/city',
        iconComponent: { name: 'cil-settings' },
      },
      {
        name: 'Sucursales',
        url: '/administration-garden/branch-office',
        iconComponent: { name: 'cil-settings' },
      },
      {
        name: 'Salas',
        url: '/administration-garden/room',
        iconComponent: { name: 'cil-settings' },
      },
      {
        name: 'Turnos',
        url: '/administration-garden/turn',
        iconComponent: { name: 'cil-settings' },
      },
      {
        name: 'Modalidades',
        url: '/administration-garden/modality',
        iconComponent: { name: 'cil-settings' },
      },
    ]
  },
  {
    title: true,
    name: 'Modulo de Administracion de Clientes'
  },
  {
    name: 'Parametros',
    url: '/administration-client',
    iconComponent: { name: 'cil-settings' },
    badge: {
      color: 'info',
      text: 'NEW'
    },
    children: [
      {
        name: 'Tipos de Documentos',
        url: '/administration-client/document-type',
        iconComponent: { name: 'cil-settings' },
      },
      {
        name: 'Parentezco',
        url: '/administration-client/relationship',
        iconComponent: { name: 'cil-settings' },
      },
      {
        name: 'Genero',
        url: '/administration-client/sex-type',
        iconComponent: { name: 'cil-settings' },
      },
      {
        name: 'Tipo de Sangre',
        url: '/administration-client/blood-type',
        iconComponent: { name: 'cil-settings' },
      },
      {
        name: 'Estado Civil',
        url: '/administration-client/marital-status',
        iconComponent: { name: 'cil-settings' },
      }
    ]
  },
  {
    title: true,
    name: 'Modulo de Pagos'
  },
  {
    name: 'Parametros',
    url: '/administration-payment',
    iconComponent: { name: 'cil-settings' },
    badge: {
      color: 'info',
      text: 'NEW'
    },
    children: [
      {
        name: 'Estado de Pagos',
        url: '/administration-payment/payment-operation',
        iconComponent: { name: 'cil-settings' },
      },
      {
        name: 'Tipos de Pagos',
        url: '/administration-payment/payment-type',
        iconComponent: { name: 'cil-settings' },
      },
    ]
  },
  {
    title: true,
    name: 'Estructuras'
  },
  {
    name: 'Configuracion',
    url: '/structures',
    iconComponent: { name: 'cil-trash' },
    badge: {
      color: 'info',
      text: 'NEW'
    },
    children: [
      {
        name: 'Ninos',
        url: '/structures/kids',
        iconComponent: { name: 'cil-speedometer' },
      },
      {
        name: 'Padres',
        url: '/structures/parents',
        iconComponent: { name: 'cil-speedometer' },
      },
      {
        name: 'Collaboradores',
        url: '/structures/collaborators',
        iconComponent: { name: 'cil-speedometer' },
      },
    ]
  },

  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' }
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Base',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/base/accordion'
      },
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs'
      },
      {
        name: 'Cards',
        url: '/base/cards'
      },
      {
        name: 'Carousel',
        url: '/base/carousel'
      },
      {
        name: 'Collapse',
        url: '/base/collapse'
      },
      {
        name: 'List Group',
        url: '/base/list-group'
      },
      {
        name: 'Navs & Tabs',
        url: '/base/navs'
      },
      {
        name: 'Pagination',
        url: '/base/pagination'
      },
      {
        name: 'Placeholder',
        url: '/base/placeholder'
      },
      {
        name: 'Popovers',
        url: '/base/popovers'
      },
      {
        name: 'Progress',
        url: '/base/progress'
      },
      {
        name: 'Spinners',
        url: '/base/spinners'
      },
      {
        name: 'Tables',
        url: '/base/tables'
      },
      {
        name: 'Tabs',
        url: '/base/tabs'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons'
      },
      {
        name: 'Button groups',
        url: '/buttons/button-groups'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns'
      },
    ]
  },
  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/forms/form-control'
      },
      {
        name: 'Select',
        url: '/forms/select'
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios'
      },
      {
        name: 'Range',
        url: '/forms/range'
      },
      {
        name: 'Input Group',
        url: '/forms/input-group'
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels'
      },
      {
        name: 'Layout',
        url: '/forms/layout'
      },
      {
        name: 'Validation',
        url: '/forms/validation'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    iconComponent: { name: 'cil-chart-pie' }
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags'
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts'
      },
      {
        name: 'Badges',
        url: '/notifications/badges'
      },
      {
        name: 'Modal',
        url: '/notifications/modal'
      },
      {
        name: 'Toast',
        url: '/notifications/toasts'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  /*{
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },*/
];
