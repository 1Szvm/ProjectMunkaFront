import { expect,afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

import * as matchers from "@testing-library/jest-dom/matchers"
expect.extend(matchers)
//kitörlődik a virtuális DOM, a tesztek hogy ne befolyásolják egymást
afterEach(()=>{
    cleanup()
})
