package com.dylanmkdr.gdsc2025.binks.service;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
public class ResumeProcessingService 
{

    public String extractTextFromResume(MultipartFile file) throws IOException 
    {
        try (ImageAnnotatorClient vision = ImageAnnotatorClient.create()) 
        {
            // Convert file to ByteString
            ByteString imgBytes = ByteString.copyFrom(file.getBytes());
            Image img = Image.newBuilder().setContent(imgBytes).build();
            Feature feature = Feature.newBuilder().setType(Feature.Type.DOCUMENT_TEXT_DETECTION).build();
            AnnotateImageRequest request = AnnotateImageRequest.newBuilder()
                    .addFeatures(feature)
                    .setImage(img)
                    .build();

            // Send request to Google Vision API
            BatchAnnotateImagesResponse response = vision.batchAnnotateImages(List.of(request));
            List<AnnotateImageResponse> responses = response.getResponsesList();

            StringBuilder extractedText = new StringBuilder();
            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    throw new RuntimeException("Google Vision API Error: " + res.getError().getMessage());
                }
                extractedText.append(res.getFullTextAnnotation().getText());
            }
            return extractedText.toString();
        }
    }
}
