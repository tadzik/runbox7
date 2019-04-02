// --------- BEGIN RUNBOX LICENSE ---------
// Copyright (C) 2016-2019 Runbox Solutions AS (runbox.com).
// 
// This file is part of Runbox 7.
// 
// Runbox 7 is free software: You can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
// 
// Runbox 7 is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with Runbox 7. If not, see <https://www.gnu.org/licenses/>.
// ---------- END RUNBOX LICENSE ----------

import { RouteReuseStrategy, ActivatedRouteSnapshot } from '@angular/router';

export class RMMRouteReuseStrategy extends RouteReuseStrategy {
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    store(route: ActivatedRouteSnapshot, handle: {}): void {
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false;
    }

    retrieve(route: ActivatedRouteSnapshot): {} {
        return null;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return false;
    }
}
