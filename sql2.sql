--队列的定义及配置
CREATE TABLE QueueConfig(
QueueId INT PRIMARY KEY,
QueueName NVARCHAR(50),
MaxCallTimes INT
)

--用户可以查看的队列列表，一个用户可以查看一个或多个队列
CREATE TABLE UserQueue(
UserId INT,
QueueId INT
PRIMARY KEY (UserId, QueueId)
)

--用户表
CREATE TABLE [User](
Id INT PRIMARY KEY,
Name NVARCHAR(32) NOT NULL,
LoginId VARCHAR(50),
Pwd VARCHAR(50),
EmpCode VARCHAR(50),
DeletedFlag INT
)
--每个用户可以到哪个窗口或诊室叫号
CREATE TABLE UserWindow(
UserId INT,
WindowId INT
)
--窗口、诊室，定义
CREATE TABLE Window(
Id INT,
Name NVARCHAR(50)
)

--排队者排队表
CREATE TABLE PersonQueue(
QueueId INT,
SeqId INT, 
InQueueTime DATETIME,
LastCallTime DATETIME,
OutQueueTIme DATETIME,
[Status] DATETIME,
CallTimes INT,
CallerId INT,
PersonId VARCHAR(50),
UniSeqId UNIQUEIDENTIFIER DEFAULT NEWID(),
)
--排队的历史，每天结束后把当前的排队数据挪至此
CREATE TABLE PersonQueueHistory(
QueueId INT,
SeqId INT, 
InQueueTime DATETIME,
LastCallTime DATETIME,
OutQueueTIme DATETIME,
[Status] DATETIME,
CallTimes INT,
CallerId INT,
PersonId VARCHAR(50),
UniSeqId UNIQUEIDENTIFIER,
)
--队列叫号日志
CREATE TABLE QueueCallLog(
Id INT IDENTITY(1,1) PRIMARY KEY,
UniSeqId  UNIQUEIDENTIFIER,
CallTime DATETIME,
)
--队列排队者排队状态
CREATE TABLE QueueStatus(
StatusId INT,
StatusName NVARCHAR(50)
)
insert into QueueStatus values(1, N'入队/等待呼叫')
insert into QueueStatus values(2, N'正在呼叫')
insert into QueueStatus values(3, N'呼叫超时')
insert into QueueStatus values(4, N'出队/呼叫成功')




