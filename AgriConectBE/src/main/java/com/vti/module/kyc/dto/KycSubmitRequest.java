package com.vti.module.kyc.dto;

import lombok.Data;
import java.util.List;

@Data
public class KycSubmitRequest {
    private String documentType;
    private String documentNumber;
    private String frontImageUrl;
    private String backImageUrl;
    private String selfieImageUrl;
    private String additionalNote;
    private List<KycDocumentRequest> documents;

    public String getDocumentType() { return documentType; }
    public String getDocumentNumber() { return documentNumber; }
    public String getFrontImageUrl() { return frontImageUrl; }
    public String getBackImageUrl() { return backImageUrl; }
    public String getSelfieImageUrl() { return selfieImageUrl; }
    public String getAdditionalNote() { return additionalNote; }
    public List<KycDocumentRequest> getDocuments() { return documents; }

    @Data
    public static class KycDocumentRequest {
        private String documentType;
        private String documentUrl;
        public String getDocumentType() { return documentType; }
        public String getDocumentUrl() { return documentUrl; }
    }
}
