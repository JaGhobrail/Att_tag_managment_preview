<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    case MANAGE_USER = 'MANAGE_USER';
    case MANAGE_UNIT = 'MANAGE_UNIT';
    case INVESTIGATE = 'INVESTIGATE';
}
