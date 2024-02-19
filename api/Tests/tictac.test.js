import { createAlbum } from "../controllers/album.controller.js";

test('Creating an album', () => {
    expect(createAlbum.create({albumId,userId,image, title}).toBe(''));
})
{/* WebApp Tested with manual testing scripts instaead */}
{/* Explanatory Testing with minimal automation tests */}