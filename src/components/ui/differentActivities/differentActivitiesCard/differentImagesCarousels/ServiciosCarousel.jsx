import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/Carousel";
import { getImages } from '../../../../classes/VarietyFunctions/ImagesFunctions/ImagesFunctions'; // Ruta correcta al archivo getImages

export function ServiciosCarousel({ imageIds }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const imageMap = {};

      // Contar la cantidad de veces que aparece cada imagen
      imageIds.forEach(imageId => {
        if (!imageMap[imageId]) {
          imageMap[imageId] = 1;
        } else {
          imageMap[imageId]++;
        }
      });

      // Obtener las imágenes únicas
      const uniqueImages = [];

      for (const imageId in imageMap) {
        if (Object.hasOwnProperty.call(imageMap, imageId)) {
          const imageBlob = await getImages(imageId);
          const imageUrl = URL.createObjectURL(imageBlob);
          uniqueImages.push(imageUrl);
        }
      }

      setImages(uniqueImages);
    };

    fetchImages();
  }, [imageIds]);

  return (
    <Carousel className="w-full max-w-xs relative">
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                  <img src={imageUrl} alt={`Imagen ${index + 1}`} className="max-w-full h-auto" />
                  {images.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-0" />
                      <CarouselNext className="absolute right-0" />
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
