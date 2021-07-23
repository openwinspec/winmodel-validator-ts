export const schema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://openwinspec.org/orderschema.json',
  title: 'Order',
  description: 'Order in Windows Branch',
  type: 'object',
  properties: {
    openwinversion: {
      type: 'string',
    },
    info: {
      $ref: '#/definitions/Info',
    },
    definitions: {
      type: 'object',
      description: '--- ранее order_data',
      properties: {
        data: {
          type: 'string',
          description: 'Дата заказа',
        },
        customer: {
          type: 'string',
          description: 'Заказчик',
        },
        specification: {
          type: 'string',
          description: '--- Зачем ?',
        },
      },
    },
    dictionaries: {
      $ref: '#/definitions/Dictionaries',
    },
    constructions: {
      type: 'array',
      description:
        '--- Альтернативно items, apertures, component, RoughOpening, определить что первично, конструкция или проем',
      items: {
        $ref: '#/definitions/Construction',
      },
    },
  },
  required: ['info', 'openwinversion'],
  definitions: {
    ID: {
      type: 'object',
      properties: {
        value: {
          type: 'string',
        },
        prefix: {
          type: 'string',
        },
      },
      required: ['value'],
    },
    Info: {
      type: 'object',
      properties: {
        id: {
          description: 'Ункальный ID заказа',
          type: 'string',
        },
        locale: {
          type: 'string',
        },
      },
      required: ['id'],
    },
    Point: {
      type: 'object',
      description:
        '--- Описание геометрической точки 3D, если координата отсутствует то она равно 0, поэтому убрали required',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        x: {
          type: 'number',
        },
        y: {
          type: 'number',
        },
        z: {
          type: 'number',
        },
      },
    },
    Segment: {
      type: 'object',
      description: 'Описание геометрического отрезка 3D для проволочной модели',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        start: {
          $ref: '#/definitions/Point',
        },
        end: {
          $ref: '#/definitions/Point',
        },
        arcHeight: {
          type: 'number',
        },
      },
      required: ['start', 'end'],
    },
    Polygon: {
      type: 'object',
      description: 'Полигон в 3D',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        sides: {
          type: 'array',
          items: {
            $ref: '#/definitions/Segment',
          },
        },
        closed: {
          description: 'замкнут ли периметр',
          type: 'boolean',
        },
      },
    },
    Locale: {
      description: '-- Один из вариантов реализации локализации',
      type: 'string',
      enum: ['EN', 'RU', 'DE'],
    },
    LocaleString: {
      type: 'object',
      properties: {
        en: {
          type: 'string',
        },
        ru: {
          type: 'string',
        },
        de: {
          type: 'string',
        },
      },
      anyOf: [
        {
          required: ['en'],
        },
        {
          required: ['ru'],
        },
        {
          required: ['de'],
        },
      ],
    },
    Dictionaries: {
      type: 'object',
      properties: {
        sync: {
          type: 'boolean',
        },
        vendors: {
          type: 'array',
          items: {
            $ref: '#/definitions/Vendor',
          },
        },
        profileSystems: {
          type: 'array',
          items: {
            $ref: '#/definitions/ProfileSystem',
          },
        },
        profiles: {
          type: 'array',
          items: {
            $ref: '#/definitions/Profile',
          },
        },
        reinforcement: {
          type: 'array',
          items: {
            $ref: '#/definitions/Reinforcement',
          },
        },
        spacer: {
          type: 'array',
          items: {
            $ref: '#/definitions/Spacer',
          },
        },
        glasses: {
          type: 'array',
          items: {
            $ref: '#/definitions/Glass',
          },
        },
        glazing: {
          type: 'array',
          items: {
            $ref: '#/definitions/Glazing',
          },
        },
        panel: {
          type: 'array',
          items: {
            $ref: '#/definitions/Panel',
          },
        },
        colors: {
          type: 'array',
          items: {
            $ref: '#/definitions/Color',
          },
        },
      },
    },
    VendorType: {
      type: 'string',
      enum: [
        'Profile',
        'Hardware',
        'Metall',
        'Glass',
        'Spacer',
        'Glazing',
        'Panel',
      ],
    },
    Vendor: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        vendorType: {
          $ref: '#/definitions/VendorType',
        },
        name: {
          $ref: '#/definitions/LocaleString',
        },
        web: {
          type: 'string',
        },
      },
      required: ['id', 'vendorType', 'name'],
    },
    VendorMaterial: {
      type: 'object',
      properties: {
        vendorId: {
          $ref: '#/definitions/ID',
        },
        article: {
          description: 'Артикул в учетных системах поставщика',
          type: 'string',
        },
        name: {
          description: 'Название в учетных системах поставщика',
          type: 'string',
        },
      },
      required: ['vendorId', 'article', 'name'],
    },
    ProfileType: {
      type: 'string',
      description: '--- Как описать типы на разных языках ???',
      enum: [
        'Frame',
        'Sash',
        'Mullion',
        'GlazingBead',
        'Reinforcement',
        'PseudoMullion',
        'Connector',
      ],
    },
    ProfileSystem: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        vendorId: {
          $ref: '#/definitions/ID',
        },
        name: {
          type: 'string',
        },
      },
      required: ['id', 'vendorId', 'name'],
    },
    Profile: {
      type: 'object',
      description: '--- Описываем армирование здесь?',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        vendorArticle: {
          $ref: '#/definitions/VendorMaterial',
        },
        profileType: {
          $ref: '#/definitions/ProfileType',
        },
        profileSystemId: {
          $ref: '#/definitions/ID',
        },
        a: {
          type: 'number',
        },
        b: {
          type: 'number',
        },
        c: {
          type: 'number',
        },
        d: {
          type: 'number',
        },
        e: {
          type: 'number',
        },
        w: {
          type: 'number',
        },
        w1: {
          type: 'number',
        },
        w2: {
          type: 'number',
        },
        h: {
          type: 'number',
        },
        h1: {
          type: 'number',
        },
        baseColor: {
          $ref: '#/definitions/ID',
        },
        internalColor: {
          $ref: '#/definitions/ID',
        },
        externalColor: {
          $ref: '#/definitions/ID',
        },
      },
      required: ['id', 'vendorArticle', 'profileType'],
    },
    Reinforcement: {
      type: 'object',
      description: '--- Или армирование описываем отдельно ???',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        vendorArticle: {
          $ref: '#/definitions/VendorMaterial',
        },
        ix: {
          type: 'number',
        },
        iy: {
          type: 'number',
        },
        h: {
          type: 'number',
        },
        h1: {
          type: 'number',
        },
        weight: {
          type: 'number',
        },
      },
      required: ['id', 'vendorArticle'],
    },
    ColorType: {
      description: '-- Тип кодирования цвета (классификатор)',
      type: 'string',
      enum: ['PVC', 'Renolit', 'RAL'],
    },
    Color: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        colorName: {
          type: 'string',
        },
        colorCode: {
          type: 'string',
        },
        colorType: {
          $ref: '#/definitions/ColorType',
        },
      },
      required: ['id', 'colorName', 'colorCode', 'colorType'],
    },
    Panel: {
      type: 'object',
      description: '-- Заполнения',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        vendorArticle: {
          $ref: '#/definitions/VendorMaterial',
        },
        panelType: {
          description: '-- Вводим тип панели?',
          type: 'string',
        },
        thickness: {
          type: 'number',
        },
        weight: {
          description: '-- Вес 1 м2',
          type: 'number',
        },
      },
      required: ['thickness'],
    },
    GlassType: {
      type: 'string',
      description:
        '-- Тип стекла, ниже из классификации по https://www.doubleglazingnetwork.com/blog/window-glass-types/',
      enum: [
        'Float Glass',
        'Laminated Safety Glass',
        'Obscured Glass',
        'Tinted Glass',
        'Tempered Glass',
        'Insulated Glass',
        'Mirrored Glass',
        'Low-E Glass',
        'Wired Glass',
      ],
    },
    Glass: {
      type: 'object',
      description:
        '-- Стекло, характеристики Lt-Ug см. например https://www.agc-yourglass.com/en-UK/brands/energy',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        vendorArticle: {
          $ref: '#/definitions/VendorMaterial',
        },
        glassType: {
          $ref: '#/definitions/GlassType',
        },
        thickness: {
          type: 'number',
        },
        weight: {
          description: '-- Вес 1 м2',
          type: 'number',
        },
        Lt: {
          type: 'number',
        },
        Sf: {
          type: 'number',
        },
        Lr: {
          type: 'number',
        },
        Ug: {
          type: 'number',
        },
      },
      required: ['glassType', 'thickness'],
    },
    Glazing: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        vendorArticle: {
          $ref: '#/definitions/VendorMaterial',
        },
        thickness: {
          type: 'number',
        },
        glasses: {
          type: 'array',
          items: {
            $ref: '#/definitions/Glass',
          },
        },
        spacer: {
          type: 'array',
          items: {
            $ref: '#/definitions/Spacer',
          },
        },
      },
    },
    SpacerMaterial: {
      type: 'string',
      description:
        '-- Материал дистанционной рамки, см. например https://www.glastory.net/insulating-glass-spacers-all-you-wanted-to-know/ и https://glazingmag.ru/distantsionnaya-ramka-dlya-steklopaketa-vidy-i-naznachenie/ и https://okna-blitz.ru/drugoe/distantsionnye-ramki-dlya-steklopaketov-razmery-i-vidy.html',
      enum: [
        'Aluminum',
        'Warm edge',
        'Stainless steel warm edge',
        'Plastic-metal hybrid warm edge',
        'Flexible warm edge',
        'TPS',
      ],
    },
    Spacer: {
      type: 'object',
      description: '-- Дистанционная рамка',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        vendorArticle: {
          $ref: '#/definitions/VendorMaterial',
        },
        size: {
          description: '-- Ширина рамки',
          type: 'number',
        },
        material: {
          $ref: '#/definitions/SpacerMaterial',
        },
        thickness: {
          description: '-- Толщина стенки',
          type: 'number',
        },
        weight: {
          description: 'Вес 1 п.м.',
          type: 'number',
        },
      },
    },
    HardwareType: {
      type: 'object',
      description: '--- to be defined',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        name: {
          typw: 'string',
        },
      },
    },
    HardwareSystem: {
      type: 'object',
      description: '--- to be defined',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        name: {
          type: 'string',
        },
      },
    },
    ProductType: {
      type: 'string',
      description: 'Тип окна, преобразовано в enum. Зачем ?',
      enum: ['Window', 'Door'],
    },
    ComponentType: {
      type: 'string',
      enum: ['Frame', 'Sash', 'Mullion', 'Filling'],
    },
    ComponentFeatures: {
      type: 'object',
      properties: {
        commonFeature: {
          $ref: '#/definitions/CommonFeature',
        },
        frameFeature: {
          $ref: '#/definitions/FrameFeature',
        },
        sashFeature: {
          $ref: '#/definitions/SashFeature',
        },
        mullionFeature: {
          $ref: '#/definitions/MullionFeature',
        },
        fillingFeature: {
          $ref: '#/definitions/FillingFeature',
        },
      },
      oneOf: [
        {
          required: ['frameFeature'],
        },
        {
          required: ['sashFeature'],
        },
        {
          required: ['mullionFeature'],
        },
        {
          required: ['fillingFeature'],
        },
      ],
    },
    CommonFeature: {
      type: 'object',
      properties: {
        baseColor: {
          type: 'string',
          description: '-- цвет основы (для ПВХ)',
        },
        internalColor: {
          type: 'string',
          description: '-- цвет ламинации/покраски изнутри/сверху',
        },
        externalColor: {
          type: 'string',
          description: '-- цвет ламинации/покраски извне',
        },
      },
    },
    FrameFeature: {
      type: 'object',
      properties: {
        sillStub: {
          type: 'boolean',
          description: 'Наличие подставочного профиля',
        },
        rabbetStub: {
          type: 'boolean',
          description: 'Наличие заглушки паза под штапик (для ПВХ)',
        },
        drained: {
          type: 'boolean',
          description: 'Наличие дренажа',
        },
        compensationHole: {
          type: 'boolean',
          description: 'Наличие компенсационных отверстий',
        },
      },
      required: ['sillStub', 'drained'],
    },
    SashOpeningType: {
      type: 'string',
      enum: [
        'Casement',
        'TiltBottom',
        'TiltTop',
        'TiltAndTurn',
        'FixedCasement',
      ],
    },
    SashFeature: {
      type: 'object',
      properties: {
        openingType: {
          $ref: '#/definitions/SashOpeningType',
        },
      },
      required: ['openingType'],
    },
    MullionFeature: {
      type: 'object',
      properties: {
        calcWind: {
          type: 'boolean',
          description: '-- Расчет ветровой нагрузки',
        },
      },
    },
    FillingType: {
      type: 'string',
      enum: ['Glazing', 'Panel', 'Virtual'],
    },
    GlazingFeature: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        glazingId: {
          description: 'Ссылка на id из справочника glazing',
          $ref: '#/definitions/ID',
        },
      },
    },
    PanelFeature: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        panelId: {
          description: 'Ссылка на id из справочника panel',
          $ref: '#/definitions/ID',
        },
      },
    },
    VirtualFeature: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
      },
    },
    FillingTypeFeatures: {
      type: 'object',
      properties: {
        glazingFeature: {
          $ref: '#/definitions/GlazingFeature',
        },
        panelFeature: {
          $ref: '#/definitions/PanelFeature',
        },
        virtualFeature: {
          $ref: '#/definitions/VirtualFeature',
        },
      },
      oneOf: [
        {
          required: ['glazingFeature'],
        },
        {
          required: ['panelFeature'],
        },
        {
          required: ['virtualFeature'],
        },
      ],
    },
    FillingFeature: {
      type: 'object',
      properties: {
        size: {
          type: 'number',
        },
        fillingType: {
          $ref: '#/definitions/FillingType',
        },
        features: {
          $ref: '#/definitions/FillingTypeFeatures',
        },
        glazingBeads: {
          type: 'array',
          items: {
            $ref: '#/definitions/Beam',
          },
        },
      },
    },
    GlazingBeadFeature: {
      type: 'object',
      properties: {
        size: {
          type: 'number',
        },
        material: {
          type: 'array',
          items: {
            $ref: '#/definitions/VendorMaterial',
          },
        },
      },
    },
    CuttingType: {
      type: 'string',
      enum: ['Angle45', 'Vertical', 'Horizontal', 'Square'],
    },
    BeamCuttings: {
      type: 'object',
      properties: {
        start_ext: {
          $ref: '#/definitions/CuttingType',
        },
        start_int: {
          $ref: '#/definitions/CuttingType',
        },
        end_ext: {
          $ref: '#/definitions/CuttingType',
        },
        end_int: {
          $ref: '#/definitions/CuttingType',
        },
      },
    },
    Beam: {
      type: 'object',
      description: '--- Балка профиля',
      properties: {
        profileId: {
          $ref: '#/definitions/ID',
          description: '--- Ссылка на профиль из справочника',
        },
        cuttings: {
          $ref: '#/definitions/BeamCuttings',
        },
        drain: {
          type: 'string',
          enum: ['NotAvailable', 'Available', 'Hidden'],
          description: 'тип дренажирования на балке',
        },
        compensationHole: {
          type: 'boolean',
          description: 'наличие компенсационных отверстий на балке',
        },
        baseColorId: {
          $ref: '#/definitions/ID',
          description: '-- цвет основы (для ПВХ)',
        },
        internalColorId: {
          $ref: '#/definitions/ID',
          description: '-- цвет ламинации/покраски изнутри/сверху',
        },
        externalColorId: {
          $ref: '#/definitions/ID',
          description: '-- цвет ламинации/покраски снаружи',
        },
      },
    },
    Component: {
      type: 'object',
      properties: {
        componentType: {
          description: '--- ex element_type',
          $ref: '#/definitions/ComponentType',
        },
        features: {
          $ref: '#/definitions/ComponentFeatures',
        },
        geometryId: {
          description: '--- ex poligon_id',
          $ref: '#/definitions/ID',
        },
        splitterId: {
          description:
            '--- ссылка на геометрию сплиттера, как это объединить с geometryId ?',
          $ref: '#/definitions/ID',
        },
        profileId: {
          description: '--- если применяется для всех балок компонента',
          $ref: '#/definitions/ID',
        },
        beams: {
          type: 'array',
          description: '--- ex profile_polygon',
          items: {
            $ref: '#/definitions/Beam',
          },
        },
        components: {
          type: 'array',
          description: '--- ex product_elements',
          items: {
            $ref: '#/definitions/Component',
          },
        },
      },
    },
    Element: {
      type: 'object',
      description: '--- Элемент конструкции',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        elementType: {
          description: '--- Тип элемента',
          $ref: '#/definitions/ProductType',
        },
        profileSystemId: {
          $ref: '#/definitions/ID',
        },
        geometry: {
          type: 'array',
          items: {
            $ref: '#/definitions/Polygon',
          },
        },
        splitters: {
          type: 'array',
          description: '--- ex segments',
          items: {
            $ref: '#/definitions/Segment',
          },
        },
        components: {
          type: 'array',
          items: {
            $ref: '#/definitions/Component',
          },
        },
      },
      required: ['id', 'geometry'],
    },
    Connection: {
      type: 'object',
      description: '--- Описание сединителя элементов конструкции',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        geometry: {
          $ref: '#/definitions/Segment',
        },
        profileId: {
          $ref: '#/definitions/ID',
        },
        cutting: {
          $ref: '#/definitions/BeamCuttings',
        },
      },
      required: ['id'],
    },
    Construction: {
      type: 'object',
      description: 'Конструкция в заказе',
      properties: {
        id: {
          $ref: '#/definitions/ID',
        },
        roughOpening: {
          description: '--- Проем в заказе',
          $ref: '#/definitions/Polygon',
        },
        elements: {
          description:
            '--- Список элементов (products, components etc.) в конструкции, ex products',
          type: 'array',
          items: {
            $ref: '#/definitions/Element',
          },
        },
        connections: {
          description: '--- Список соединетелей элементов конструкции',
          type: 'array',
          items: {
            $ref: '#/definitions/Connection',
          },
        },
      },
      required: ['id'],
    },
  },
};
