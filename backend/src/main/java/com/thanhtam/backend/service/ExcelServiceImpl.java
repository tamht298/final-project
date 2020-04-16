package com.thanhtam.backend.service;

import com.thanhtam.backend.entity.Profile;
import com.thanhtam.backend.entity.Role;
import com.thanhtam.backend.entity.User;
import com.thanhtam.backend.repository.UserRepository;
import com.thanhtam.backend.ultilities.ERole;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class ExcelServiceImpl implements ExcelService {
    private final Path root = Paths.get("uploads");
    private static final Logger LOGGER = LoggerFactory.getLogger(ExcelServiceImpl.class);

    private FilesStorageService filesStorageService;
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private RoleService roleService;

    @Autowired
    public ExcelServiceImpl(FilesStorageService filesStorageService, PasswordEncoder passwordEncoder, UserRepository userRepository, RoleService roleService) {
        this.filesStorageService = filesStorageService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    @Override
    public List<User> readUserFromExcelFile(String excelFilePath) throws IOException {
        List<User> userList = new ArrayList<>();
        FileInputStream inputStream = new FileInputStream(new File(excelFilePath));

        Workbook workBook = getWorkbook(inputStream, excelFilePath);
        Sheet firstSheet = workBook.getSheetAt(0);
        LOGGER.info(firstSheet.getSheetName());
        Iterator<Row> rows = firstSheet.iterator();

        while (rows.hasNext()) {
            Row row = rows.next();
            Iterator<Cell> cells = row.cellIterator();
            User user = new User();
            Profile profile = new Profile();

            while (cells.hasNext()) {
                Cell cell = cells.next();
                int columnIndex = cell.getColumnIndex();

                switch (columnIndex) {
                    case 0: {
                        user.setUsername((String) getCellValue(cell));
                        user.setPassword(passwordEncoder.encode((String) getCellValue(cell)));

                    }
                    break;

                    case 1: {
                        user.setEmail((String) getCellValue(cell));
                    }

                    break;
                    case 2: {
                        profile.setFirstName((String) getCellValue(cell));
                        user.setProfile(profile);

                    }

                    break;
                    case 3: {
                        profile.setLastName((String) getCellValue(cell));
                        user.setProfile(profile);

                    }

                    break;
                }

            }
            Role userRole = roleService.findByName(ERole.ROLE_STUDENT).orElseThrow(() -> new RuntimeException("Error: Role is not found"));
            Set<Role> roles = new HashSet<>();
            roles.add(userRole);
            user.setRoles(roles);
            userList.add(user);
        }

        workBook.close();
        inputStream.close();
        LOGGER.error("List user: " + userList.toString());
        return userList;
    }

    @Override
    public void InsertUserToDB(List<User> userList) {
        userList.forEach(user -> {
            if (userRepository.existsByEmailOrUsername(user.getEmail(), user.getUsername())) {
                try {
                    throw new Exception("Username or email has already existed");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                userRepository.save(user);
            }
        });

    }

    private Object getCellValue(Cell cell) {
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_STRING:
                return cell.getStringCellValue();

            case Cell.CELL_TYPE_BOOLEAN:
                return cell.getBooleanCellValue();

            case Cell.CELL_TYPE_NUMERIC:
                return cell.getNumericCellValue();
        }

        return null;
    }

    private Workbook getWorkbook(FileInputStream inputStream, String excelFilePath) throws IOException {
        Workbook workbook = null;

        if (excelFilePath.endsWith("xlsx")) {
            workbook = new XSSFWorkbook(inputStream);
        } else if (excelFilePath.endsWith("xls")) {
            workbook = new HSSFWorkbook(inputStream);
        } else {
            throw new IllegalArgumentException("The specified file is not Excel file");
        }

        return workbook;
    }
}
