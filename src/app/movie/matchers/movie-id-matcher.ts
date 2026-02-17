// import { UrlMatchResult, UrlSegment } from "@angular/router";
// export function movieIdMatcher(urlSegments: UrlSegment[]): UrlMatchResult | null {
//     if (!urlSegments[1].path.match(/^\d+$/gm)) {
//         return null;
//     }
//     console.log("movieIdMatcher", urlSegments[1].path)
//     return {
//         consumed: urlSegments,
//         posParams: {
//             movieId: new UrlSegment(urlSegments[1].path, {})
//         }
//     }

// }   

import { UrlSegment, UrlMatchResult } from '@angular/router';

export function movieIdMatcher(
    segments: UrlSegment[]
): UrlMatchResult | null {
    if (segments.length === 2 && segments[0].path === 'movies') {
        console.log("movieIdMatcher", segments[1].path)
        return {
            consumed: segments,
            posParams: {
                movieId: segments[1]
            }
        };
    }
    return null;
}
