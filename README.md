# Analogue Pocket Framework Image Processor

Simple image processing for APF platform images.

![Analogue platform image demo](https://images.analogue.co/platform_art.2ad219560f99a334bf59ef9641c433f6.png?auto=format&w=1200&q=100&s=74e9636d11c828a74b67f9a060a59abb)

## Creation

The creation script converts a 521x165 PNG image into a 16 bit greyscale bitmap, where the upper byte stores the brightness of the pixel, where white is `0x00` and black is `0xFF`. At the moment, the lower byte is always `0x00`. This image is stored rotated 90 degrees counter-clockwise (creating a resolution of 165x521).

To prepare an image for display on the Pocket:

1. Create a 521x165 greyscale image (transparent pixels will be converted into white)
2. Save image as PNG
3. Run:

```bash
npm run create input.png <platform name>.bin
```

4. Place this image in the appropriate platform folder in the `/Platforms/_images/`. [See the Analogue docs for more information](https://www.analogue.co/developer/docs/packaging-a-core#graphical-asset-formats)

## Extraction

Extracting an existing platform image will invert the color (back to what it started as) and revert the 90 degree rotation performed during creation.

To extract a previously created APF platform image, run:

```bash
npm run extract input.bin output.png
```

