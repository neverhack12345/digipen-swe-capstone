package com.digipen.se.financetracker.model;

import lombok.Data;

@Data
public class SubCategoryCreationDTO {
    private int subId;
    private String subName;
    private int catId;
}
