--���еĶ��弰����
CREATE TABLE QueueConfig(
QueueId INT PRIMARY KEY,
QueueName NVARCHAR(50),
MaxCallTimes INT
)

--�û����Բ鿴�Ķ����б�һ���û����Բ鿴һ����������
CREATE TABLE UserQueue(
UserId INT,
QueueId INT
PRIMARY KEY (UserId, QueueId)
)

--�û���
CREATE TABLE [User](
Id INT PRIMARY KEY,
Name NVARCHAR(32) NOT NULL,
LoginId VARCHAR(50),
Pwd VARCHAR(50),
EmpCode VARCHAR(50),
DeletedFlag INT
)
--ÿ���û����Ե��ĸ����ڻ����ҽк�
CREATE TABLE UserWindow(
UserId INT,
WindowId INT
)
--���ڡ����ң�����
CREATE TABLE Window(
Id INT,
Name NVARCHAR(50)
)

--�Ŷ����Ŷӱ�
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
--�Ŷӵ���ʷ��ÿ�������ѵ�ǰ���Ŷ�����Ų����
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
--���нк���־
CREATE TABLE QueueCallLog(
Id INT IDENTITY(1,1) PRIMARY KEY,
UniSeqId  UNIQUEIDENTIFIER,
CallTime DATETIME,
)
--�����Ŷ����Ŷ�״̬
CREATE TABLE QueueStatus(
StatusId INT,
StatusName NVARCHAR(50)
)
insert into QueueStatus values(1, N'���/�ȴ�����')
insert into QueueStatus values(2, N'���ں���')
insert into QueueStatus values(3, N'���г�ʱ')
insert into QueueStatus values(4, N'����/���гɹ�')




