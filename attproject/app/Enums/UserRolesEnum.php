<?php

namespace App\Enums;

enum UserRolesEnum: string
{
    case SUPER_ADMIN = 'SUPER_ADMIN';
    case UNIT_ADMIN = 'UNIT_ADMIN';
    case INVESTIGATOR = 'INVESTIGATOR';
    case REVIWER = 'REVIWER';
    case PARTNER = 'PARTNER';
    case USER = 'USER';
}
