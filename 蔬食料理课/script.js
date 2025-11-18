// 全局变量声明
let students = [];
let attendanceRecords = [];
let courseSchedules = [];
let editingStudentId = null;
let editingAttendanceId = null;
let editingCourseId = null;
let studentTypeChart = null;
let attendanceChart = null;

// DOM元素变量
let studentsTable, attendanceTable, scheduleTable;
let studentModal, attendanceModal, courseModal;
let studentForm, attendanceForm, courseForm;
let saveStudentBtn, saveAttendanceBtn, saveCourseBtn;
let attendanceStudentId, attendanceStudentName;

// 数据存储函数
function loadDataFromStorage() {
    // 从localStorage加载数据，如果没有则初始化示例数据
    const storedStudents = localStorage.getItem('students');
    const storedAttendance = localStorage.getItem('attendanceRecords');
    const storedSchedules = localStorage.getItem('courseSchedules');
    
    if (storedStudents) {
        students = JSON.parse(storedStudents);
    } else {
        // 初始化示例数据
        students = [
            {
                id: "S001",
                name: "张三",
                phone: "13800138000",
                enrollmentType: "全课",
                remainingClasses: 10,
                notes: "素食爱好者"
            },
            {
                id: "S002",
                name: "李四",
                phone: "13900139000",
                enrollmentType: "单次",
                remainingClasses: 1,
                notes: "对素食料理感兴趣"
            }
        ];
        saveDataToStorage();
    }
    
    if (storedAttendance) {
        attendanceRecords = JSON.parse(storedAttendance);
    } else {
        // 初始化示例数据
        attendanceRecords = [
            {
                id: "A001",
                studentId: "S001",
                studentName: "张三",
                date: getCurrentDate(),
                courseNumber: 1,
                deductionType: "常规"
            }
        ];
        saveDataToStorage();
    }
    
    if (storedSchedules) {
        courseSchedules = JSON.parse(storedSchedules);
    } else {
        // 初始化示例数据
        courseSchedules = [
            {
                id: "C001",
                courseNumber: 1,
                date: getCurrentDate(),
                topic: "基础刀工技巧",
                teacher: "李老师"
            },
            {
                id: "C002",
                courseNumber: 2,
                date: getNextWeekDate(),
                topic: "蔬菜营养搭配",
                teacher: "王老师"
            }
        ];
        saveDataToStorage();
    }
}

function saveDataToStorage() {
    // 保存数据到localStorage
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    localStorage.setItem('courseSchedules', JSON.stringify(courseSchedules));
}

// 绑定学员表格按钮事件
function bindStudentButtonEvents() {
    // 编辑学员按钮事件
    document.querySelectorAll('.edit-student').forEach(button => {
        button.addEventListener('click', function() {
            const studentId = this.getAttribute('data-id');
            const student = students.find(s => s.id === studentId);
            
            if (student) {
                document.getElementById('studentId').value = student.id;
                document.getElementById('studentName').value = student.name;
                document.getElementById('studentPhone').value = student.phone;
                document.getElementById('enrollmentType').value = student.enrollmentType;
                document.getElementById('purchasedClasses').value = student.remainingClasses;
                document.getElementById('studentNotes').value = student.notes || '';
                document.getElementById('editingStudentId').value = student.id;
                
                document.getElementById('studentModalTitle').textContent = '编辑学员';
                const modal = new bootstrap.Modal(studentModal);
                modal.show();
            }
        });
    });
    
    // 删除学员按钮事件
    document.querySelectorAll('.delete-student').forEach(button => {
        button.addEventListener('click', function() {
            const studentId = this.getAttribute('data-id');
            
            if (confirm('确定要删除该学员吗？')) {
                students = students.filter(s => s.id !== studentId);
                saveDataToStorage();
                renderStudentsTable();
                populateStudentOptions();
                updateStatistics();
                renderCharts();
                showMessage('学员已删除', 'success');
            }
        });
    });
}

// 绑定签到记录表格按钮事件
function bindAttendanceButtonEvents() {
    // 编辑签到记录按钮事件
    document.querySelectorAll('.edit-attendance').forEach(button => {
        button.addEventListener('click', function() {
            const attendanceId = this.getAttribute('data-id');
            const attendance = attendanceRecords.find(a => a.id === attendanceId);
            
            if (attendance) {
                document.getElementById('attendanceStudentId').value = attendance.studentId;
                document.getElementById('attendanceStudentName').value = attendance.studentName;
                document.getElementById('attendanceDate').value = attendance.date;
                document.getElementById('courseNumber').value = attendance.courseNumber;
                document.getElementById('deductionType').value = attendance.deductionType;
                document.getElementById('editingAttendanceId').value = attendance.id;
                
                document.getElementById('attendanceModalTitle').textContent = '编辑签到记录';
                const modal = new bootstrap.Modal(attendanceModal);
                modal.show();
            }
        });
    });
    
    // 删除签到记录按钮事件
    document.querySelectorAll('.delete-attendance').forEach(button => {
        button.addEventListener('click', function() {
            const attendanceId = this.getAttribute('data-id');
            
            if (confirm('确定要删除该签到记录吗？')) {
                attendanceRecords = attendanceRecords.filter(a => a.id !== attendanceId);
                saveDataToStorage();
                renderAttendanceTable();
                updateStatistics();
                renderCharts();
                showMessage('签到记录已删除', 'success');
            }
        });
    });
}

// 绑定课程表格按钮事件
function bindScheduleButtonEvents() {
    // 编辑课程按钮事件
    document.querySelectorAll('.edit-course').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-id');
            const course = courseSchedules.find(c => c.id === courseId);
            
            if (course) {
                document.getElementById('courseNumberInput').value = course.courseNumber;
                document.getElementById('courseDate').value = course.date;
                document.getElementById('courseTopic').value = course.topic;
                document.getElementById('courseTeacher').value = course.teacher;
                document.getElementById('editingCourseId').value = course.id;
                
                document.getElementById('courseModalTitle').textContent = '编辑课程';
                const modal = new bootstrap.Modal(courseModal);
                modal.show();
            }
        });
    });
    
    // 删除课程按钮事件
    document.querySelectorAll('.delete-course').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-id');
            
            if (confirm('确定要删除该课程吗？')) {
                courseSchedules = courseSchedules.filter(c => c.id !== courseId);
                saveDataToStorage();
                renderScheduleTable();
                showMessage('课程已删除', 'success');
            }
        });
    });
}

// 表格渲染函数
function renderStudentsTable() {
    const tbody = document.getElementById('studentsTableBody');
    tbody.innerHTML = '';
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.phone}</td>
            <td><span class="badge ${student.enrollmentType === '全课' ? 'bg-primary' : 'bg-success'}">${student.enrollmentType}</span></td>
            <td>${student.remainingClasses}</td>
            <td>${student.notes || '-'}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-student" data-id="${student.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-student" data-id="${student.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // 绑定按钮事件
    bindStudentButtonEvents();
}

function renderAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    tbody.innerHTML = '';
    
    attendanceRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${attendanceRecords.indexOf(record) + 1}</td>
            <td>${record.studentId}</td>
            <td>${record.studentName}</td>
            <td>${record.date}</td>
            <td>${record.courseNumber}</td>
            <td><span class="badge ${record.deductionType === '常规' ? 'bg-info' : 'bg-warning'}">${record.deductionType}</span></td>
            <td>
                <button class="btn btn-sm btn-warning edit-attendance" data-id="${record.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-attendance" data-id="${record.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // 绑定按钮事件
    bindAttendanceButtonEvents();
}

function renderScheduleTable() {
    const tbody = document.getElementById('scheduleTableBody');
    tbody.innerHTML = '';
    
    courseSchedules.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.courseNumber}</td>
            <td>${course.date}</td>
            <td>${course.topic}</td>
            <td>${course.teacher}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-course" data-id="${course.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-course" data-id="${course.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    // 绑定按钮事件
    bindScheduleButtonEvents();
}

// 表单处理函数
function handleStudentSubmit(event) {
    event.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const studentPhone = document.getElementById('studentPhone').value;
    const enrollmentType = document.getElementById('enrollmentType').value;
    const purchasedClasses = parseInt(document.getElementById('purchasedClasses').value);
    const studentNotes = document.getElementById('studentNotes').value;
    const editingId = document.getElementById('editingStudentId').value;
    
    if (editingId) {
        // 编辑现有学员
        const studentIndex = students.findIndex(s => s.id === editingId);
        if (studentIndex !== -1) {
            students[studentIndex] = {
                id: studentId,
                name: studentName,
                phone: studentPhone,
                enrollmentType: enrollmentType,
                remainingClasses: purchasedClasses,
                notes: studentNotes
            };
        }
    } else {
        // 添加新学员
        const newStudent = {
            id: studentId,
            name: studentName,
            phone: studentPhone,
            enrollmentType: enrollmentType,
            remainingClasses: purchasedClasses,
            notes: studentNotes
        };
        students.push(newStudent);
    }
    
    saveDataToStorage();
    renderStudentsTable();
    populateStudentOptions();
    updateStatistics();
    renderCharts();
    
    // 重置表单并关闭模态框
    studentForm.reset();
    document.getElementById('editingStudentId').value = '';
    const modal = bootstrap.Modal.getInstance(studentModal);
    modal.hide();
    
    showMessage('学员信息已保存', 'success');
}

function handleAttendanceSubmit(event) {
    event.preventDefault();
    
    const studentId = document.getElementById('attendanceStudentId').value;
    const studentName = document.getElementById('attendanceStudentName').value;
    const attendanceDate = document.getElementById('attendanceDate').value;
    const courseNumber = parseInt(document.getElementById('courseNumber').value);
    const deductionType = document.getElementById('deductionType').value;
    const editingId = document.getElementById('editingAttendanceId').value;
    
    // 查找学员并扣减课时
    const student = students.find(s => s.id === studentId);
    if (student && student.remainingClasses > 0) {
        if (deductionType === '常规') {
            student.remainingClasses -= 1;
        }
        // 补课不扣减课时
    } else if (student && student.remainingClasses <= 0) {
        showMessage('该学员剩余课时不足', 'error');
        return;
    } else {
        showMessage('找不到该学员信息', 'error');
        return;
    }
    
    if (editingId) {
        // 编辑现有签到记录
        const attendanceIndex = attendanceRecords.findIndex(a => a.id === editingId);
        if (attendanceIndex !== -1) {
            attendanceRecords[attendanceIndex] = {
                id: editingId,
                studentId: studentId,
                studentName: studentName,
                date: attendanceDate,
                courseNumber: courseNumber,
                deductionType: deductionType
            };
        }
    } else {
        // 添加新签到记录
        const newAttendance = {
            id: "A" + (attendanceRecords.length + 1).toString().padStart(3, '0'),
            studentId: studentId,
            studentName: studentName,
            date: attendanceDate,
            courseNumber: courseNumber,
            deductionType: deductionType
        };
        attendanceRecords.push(newAttendance);
    }
    
    saveDataToStorage();
    renderStudentsTable();
    renderAttendanceTable();
    updateStatistics();
    renderCharts();
    
    // 重置表单并关闭模态框
    attendanceForm.reset();
    document.getElementById('editingAttendanceId').value = '';
    document.getElementById('attendanceStudentName').value = '';
    const modal = bootstrap.Modal.getInstance(attendanceModal);
    modal.hide();
    
    showMessage('签到记录已保存', 'success');
}

function handleCourseSubmit(event) {
    event.preventDefault();
    
    const courseNumber = parseInt(document.getElementById('courseNumberInput').value);
    const courseDate = document.getElementById('courseDate').value;
    const courseTopic = document.getElementById('courseTopic').value;
    const courseTeacher = document.getElementById('courseTeacher').value;
    const editingId = document.getElementById('editingCourseId').value;
    
    if (editingId) {
        // 编辑现有课程
        const courseIndex = courseSchedules.findIndex(c => c.id === editingId);
        if (courseIndex !== -1) {
            courseSchedules[courseIndex] = {
                id: editingId,
                courseNumber: courseNumber,
                date: courseDate,
                topic: courseTopic,
                teacher: courseTeacher
            };
        }
    } else {
        // 添加新课程
        const newCourse = {
            id: "C" + (courseSchedules.length + 1).toString().padStart(3, '0'),
            courseNumber: courseNumber,
            date: courseDate,
            topic: courseTopic,
            teacher: courseTeacher
        };
        courseSchedules.push(newCourse);
    }
    
    saveDataToStorage();
    renderScheduleTable();
    
    // 重置表单并关闭模态框
    courseForm.reset();
    document.getElementById('editingCourseId').value = '';
    const modal = bootstrap.Modal.getInstance(courseModal);
    modal.hide();
    
    showMessage('课程信息已保存', 'success');
}

// 辅助函数
function populateStudentOptions() {
    const select = document.getElementById('attendanceStudentId');
    select.innerHTML = '<option value="">请选择学员</option>';
    
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = `${student.id} - ${student.name}`;
        select.appendChild(option);
    });
}

function updateStatistics() {
    // 计算全课学员总数
    const fullCourseStudents = students.filter(s => s.enrollmentType === '全课').length;
    document.getElementById('totalFullCourseStudents').textContent = fullCourseStudents;
    
    // 计算单次学员总数
    const singleSessionStudents = students.filter(s => s.enrollmentType === '单次').length;
    document.getElementById('totalSingleSessionStudents').textContent = singleSessionStudents;
    
    // 计算本月签到次数
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyAttendance = attendanceRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    }).length;
    document.getElementById('monthlyAttendance').textContent = monthlyAttendance;
    
    // 计算平均出勤率
    let totalExpectedAttendance = 0;
    let totalActualAttendance = attendanceRecords.length;
    
    students.forEach(student => {
        if (student.enrollmentType === '全课') {
            totalExpectedAttendance += 10; // 全课学员应有10次出勤
        } else {
            totalExpectedAttendance += 1; // 单次学员应有1次出勤
        }
    });
    
    const averageAttendanceRate = totalExpectedAttendance > 0 
        ? Math.round((totalActualAttendance / totalExpectedAttendance) * 100) 
        : 0;
    document.getElementById('averageAttendanceRate').textContent = averageAttendanceRate + '%';
}

function renderCharts() {
    // 检查Chart是否已定义
    if (typeof Chart === 'undefined') {
        console.error('Chart.js未加载，无法渲染图表');
        return;
    }
    
    // 销毁现有图表实例
    if (studentTypeChart) {
        studentTypeChart.destroy();
    }
    if (attendanceChart) {
        attendanceChart.destroy();
    }
    
    // 学员类型分布饼图
    const fullCourseCount = students.filter(s => s.enrollmentType === '全课').length;
    const singleSessionCount = students.filter(s => s.enrollmentType === '单次').length;
    
    const studentTypeCtx = document.getElementById('studentTypeChart');
    if (!studentTypeCtx) {
        console.error('找不到studentTypeChart元素');
        return;
    }
    
    studentTypeChart = new Chart(studentTypeCtx.getContext('2d'), {
        type: 'pie',
        data: {
            labels: ['全课学员', '单次学员'],
            datasets: [{
                data: [fullCourseCount, singleSessionCount],
                backgroundColor: [
                    'rgba(13, 110, 253, 0.7)',
                    'rgba(25, 135, 84, 0.7)'
                ],
                borderColor: [
                    'rgba(13, 110, 253, 1)',
                    'rgba(25, 135, 84, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
    
    // 课程出勤情况柱状图
    const courseAttendanceData = {};
    
    // 初始化所有课程的出勤数据
    courseSchedules.forEach(course => {
        courseAttendanceData[course.courseNumber] = 0;
    });
    
    // 统计每门课程的出勤人数
    attendanceRecords.forEach(record => {
        if (courseAttendanceData.hasOwnProperty(record.courseNumber)) {
            courseAttendanceData[record.courseNumber]++;
        }
    });
    
    const sortedCourses = Object.keys(courseAttendanceData).sort((a, b) => parseInt(a) - parseInt(b));
    const attendanceCounts = sortedCourses.map(courseNumber => courseAttendanceData[courseNumber]);
    const courseLabels = sortedCourses.map(courseNumber => `第${courseNumber}课`);
    
    const attendanceCtx = document.getElementById('attendanceChart');
    if (!attendanceCtx) {
        console.error('找不到attendanceChart元素');
        return;
    }
    
    attendanceChart = new Chart(attendanceCtx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: courseLabels,
            datasets: [{
                label: '出勤人数',
                data: attendanceCounts,
                backgroundColor: 'rgba(13, 202, 240, 0.7)',
                borderColor: 'rgba(13, 202, 240, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// 事件监听器初始化
function initializeEventListeners() {
    // 重新获取DOM元素，避免引用错误
    studentsTable = document.getElementById('studentsTable');
    attendanceTable = document.getElementById('attendanceTable');
    scheduleTable = document.getElementById('scheduleTable');
    studentModal = document.getElementById('studentModal');
    attendanceModal = document.getElementById('attendanceModal');
    courseModal = document.getElementById('courseModal');
    studentForm = document.getElementById('studentForm');
    attendanceForm = document.getElementById('attendanceForm');
    courseForm = document.getElementById('courseForm');
    saveStudentBtn = document.getElementById('saveStudentBtn');
    saveAttendanceBtn = document.getElementById('saveAttendanceBtn');
    saveCourseBtn = document.getElementById('saveCourseBtn');
    attendanceStudentId = document.getElementById('attendanceStudentId');
    attendanceStudentName = document.getElementById('attendanceStudentName');
    
    // 学员表单提交事件
    saveStudentBtn.addEventListener('click', handleStudentSubmit);
    
    // 签到表单提交事件
    saveAttendanceBtn.addEventListener('click', handleAttendanceSubmit);
    
    // 课程表单提交事件
    saveCourseBtn.addEventListener('click', handleCourseSubmit);
    
    // 学员选择变化事件
    attendanceStudentId.addEventListener('change', function() {
        const selectedStudent = students.find(s => s.id === this.value);
        if (selectedStudent) {
            attendanceStudentName.value = selectedStudent.name;
        } else {
            attendanceStudentName.value = '';
        }
    });
    
    // 报名类型变化事件
    document.getElementById('enrollmentType').addEventListener('change', function() {
        const purchasedClassesInput = document.getElementById('purchasedClasses');
        if (this.value === '全课') {
            purchasedClassesInput.value = 10;
        } else if (this.value === '单次') {
            purchasedClassesInput.value = 1;
        }
    });
    
    // 模态框关闭事件 - 重置表单
    studentModal.addEventListener('hidden.bs.modal', function () {
        studentForm.reset();
        document.getElementById('editingStudentId').value = '';
        document.getElementById('studentModalTitle').textContent = '添加学员';
    });
    
    attendanceModal.addEventListener('hidden.bs.modal', function () {
        attendanceForm.reset();
        document.getElementById('editingAttendanceId').value = '';
        document.getElementById('attendanceStudentName').value = '';
        document.getElementById('attendanceModalTitle').textContent = '添加签到记录';
    });
    
    courseModal.addEventListener('hidden.bs.modal', function () {
        courseForm.reset();
        document.getElementById('editingCourseId').value = '';
        document.getElementById('courseModalTitle').textContent = '添加课程';
    });
}

// 工具函数
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getNextWeekDate() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const year = nextWeek.getFullYear();
    const month = String(nextWeek.getMonth() + 1).padStart(2, '0');
    const day = String(nextWeek.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function showMessage(message, type) {
    // 创建消息元素
    const messageElement = document.createElement('div');
    messageElement.className = `${type}-message`;
    messageElement.textContent = message;
    
    // 添加到页面
    document.body.appendChild(messageElement);
    
    // 显示消息
    setTimeout(() => {
        messageElement.classList.add('show');
    }, 100);
    
    // 3秒后隐藏并移除消息
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, 300);
    }, 3000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前日期
    document.getElementById('attendanceDate').value = getCurrentDate();
    
    // 加载数据
    loadDataFromStorage();
    
    // 渲染表格
    renderStudentsTable();
    renderAttendanceTable();
    renderScheduleTable();
    
    // 更新统计数据
    updateStatistics();
    
    // 检查Chart.js是否已加载，然后渲染图表
    if (typeof Chart !== 'undefined') {
        renderCharts();
    } else {
        console.error('Chart.js未加载，无法渲染图表');
        // 尝试延迟加载图表
        setTimeout(function() {
            if (typeof Chart !== 'undefined') {
                renderCharts();
            } else {
                console.error('Chart.js仍未加载，请检查引入');
            }
        }, 1000);
    }
    
    // 填充学员选项
    populateStudentOptions();
    
    // 初始化事件监听器
    initializeEventListeners();
});