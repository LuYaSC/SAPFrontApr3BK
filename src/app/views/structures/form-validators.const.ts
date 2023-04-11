import { Validators } from '@angular/forms';

export const PARENT_FORM_VALIDATORS: any =
{
  id: [],
  name: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  firstLastName: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  secondLastName: [
    '',
    [
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  address: [
    '',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]
  ],
  documentNumber: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(10),
    ]
  ],
  placeBorn: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60),
    ]
  ],
  phoneNumber: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]
  ],
};

export const KID_FORM_VALIDATORS: any =
{
  id: [],
  bornDate: [
    '',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]
  ],
  startDate: [
    '',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]
  ],
  name: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  firstLastName: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  secondLastName: [
    '',
    [
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  documentNumber: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(10),
    ]
  ],
  placeBorn: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60),
    ]
  ],
};

export const COLLABORATOR_FORM_VALIDATORS: any =
{
  id: [],
  name: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  firstLastName: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  secondLastName: [
    '',
    [
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  bornDate: [
    '',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]
  ],
  startDate: [
    '',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]
  ],
  endDate: [
    '',
    [
      Validators.minLength(10),
      Validators.maxLength(10),
    ]
  ],
  documentNumber: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(10),
    ]
  ],
  email: [
    '',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(60),
      Validators.email,
    ]
  ],
  address: [
    '',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]
  ],
  phoneNumber: [
    '',
    [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]
  ],
};

export const TUTOR_ASSIGNED: any =
{
  id: [],
  observations: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
};

export const ROOM_ASSIGNED: any =
{
  id: [],
  observations: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
};

export const ENROLL_CHILDREN: any =
{
  id: [],
  observations: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]
  ],
  amount: [
    '',
    [
      Validators.minLength(2),
      Validators.maxLength(4),
    ]
  ],
};

export const PAYMENT: any =
{
  id: [],
  observations: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]
  ],
  amount: [
    '',
    [
      Validators.minLength(2),
      Validators.maxLength(4),
    ]
  ],
  description: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]
  ],
  numberBill: [
    '',
    [
      Validators.minLength(1),
      Validators.maxLength(10),
    ]
  ],
  dateToPay: [
    '',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]
  ],

};






