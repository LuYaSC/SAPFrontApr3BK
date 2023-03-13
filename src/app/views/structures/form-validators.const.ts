import { Validators } from '@angular/forms';

export const PARENT_FORM_VALIDATORS: any =
{
  id: [],
  name: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]
  ],
  firstLastName: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]
  ],
  secondLastName: [
    '',
    [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]
  ],
  address: [
    '',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50),
    ]
  ],
  documentNumber: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]
  ],
  placeBorn: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
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
      Validators.minLength(6),
      Validators.maxLength(10),
    ]
  ],
  startDate: [
    '',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
    ]
  ],
  name: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]
  ],
  firstLastName: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]
  ],
  secondLastName: [
    '',
    [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]
  ],
  documentNumber: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]
  ],
  placeBorn: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
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
      Validators.maxLength(20),
    ]
  ],
  firstLastName: [
    '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]
  ],
  secondLastName: [
    '',
    [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]
  ],
  bornDate: [
    '',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
    ]
  ],
  startDate: [
    '',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(10),
    ]
  ],
  endDate: [
    '',
    [
      Validators.minLength(6),
      Validators.maxLength(10),
    ]
  ],
  documentNumber: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10),
    ]
  ],
  email: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
      Validators.email,
    ]
  ],
  address: [
    '',
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30),
    ]
  ],
  phoneNumber: [
    '',
    [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(8),
    ]
  ],
};




