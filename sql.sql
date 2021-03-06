USE [test]
GO
/****** Object:  Table [dbo].[QueueClass]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QueueClass](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QueueCallLog]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QueueCallLog](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UniSeqId] [uniqueidentifier] NULL,
	[CallTime] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonQueueHistory]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PersonQueueHistory](
	[QueueId] [int] NULL,
	[SeqId] [int] NULL,
	[InQueueTime] [datetime] NULL,
	[LastCallTime] [datetime] NULL,
	[OutQueueTIme] [datetime] NULL,
	[Status] [datetime] NULL,
	[CallTimes] [int] NULL,
	[CallerId] [int] NULL,
	[PersonId] [varchar](50) NULL,
	[UniSeqId] [uniqueidentifier] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[PersonQueue]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[PersonQueue](
	[QueueId] [int] NULL,
	[SeqId] [int] NULL,
	[InQueueTime] [datetime] NULL,
	[LastCallTime] [datetime] NULL,
	[OutQueueTIme] [datetime] NULL,
	[Status] [datetime] NULL,
	[CallTimes] [int] NULL,
	[CallerId] [int] NULL,
	[PersonId] [varchar](50) NULL,
	[UniSeqId] [uniqueidentifier] NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Window]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Window](
	[Id] [int] NULL,
	[Name] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserWindow]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserWindow](
	[UserId] [int] NULL,
	[WindowId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserQueue]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserQueue](
	[UserId] [int] NOT NULL,
	[QueueId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[QueueId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](32) NOT NULL,
	[LoginId] [varchar](50) NULL,
	[Pwd] [varchar](50) NULL,
	[EmpCode] [varchar](50) NULL,
	[DeletedFlag] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[QueueStatus]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QueueStatus](
	[StatusId] [int] NULL,
	[StatusName] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[proc_updateQueueClass]    Script Date: 12/31/2014 07:55:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[proc_updateQueueClass]
	@id int,
	@name nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    update QueueClass
    set Name = @name
    where Id=@id;
    if @@ROWCOUNT>0
		return 0
	else
		return 1
END
GO
/****** Object:  StoredProcedure [dbo].[proc_getQueueClassList]    Script Date: 12/31/2014 07:55:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[proc_getQueueClassList]
as
begin
	select * from QueueClass
end
GO
/****** Object:  StoredProcedure [dbo].[proc_deleteQueueClass]    Script Date: 12/31/2014 07:55:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[proc_deleteQueueClass]
	@id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    delete from QueueClass
    where Id=@id;
    if @@ROWCOUNT>0
		return 0
	else
		return 1
END
GO
/****** Object:  StoredProcedure [dbo].[proc_addQueueClass]    Script Date: 12/31/2014 07:55:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[proc_addQueueClass](
@name NVARCHAR(50)
)
as
begin
set nocount on
insert into QueueClass values(@name)
if @@ROWCOUNT>0
begin
	select SCOPE_IDENTITY() AS ClassId
	set nocount off
	return 0
end
else 
begin
	set nocount off
	return 1
end
end
GO
/****** Object:  Table [dbo].[QueueConfig]    Script Date: 12/31/2014 07:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QueueConfig](
	[QueueId] [int] NOT NULL,
	[QueueName] [nvarchar](50) NULL,
	[MaxCallTimes] [int] NULL,
	[QueueClassId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[QueueId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Default [DF__PersonQue__UniSe__1B0907CE]    Script Date: 12/31/2014 07:55:54 ******/
ALTER TABLE [dbo].[PersonQueue] ADD  DEFAULT (newid()) FOR [UniSeqId]
GO
/****** Object:  ForeignKey [fk_queueclassid]    Script Date: 12/31/2014 07:55:54 ******/
ALTER TABLE [dbo].[QueueConfig]  WITH CHECK ADD  CONSTRAINT [fk_queueclassid] FOREIGN KEY([QueueClassId])
REFERENCES [dbo].[QueueClass] ([Id])
GO
ALTER TABLE [dbo].[QueueConfig] CHECK CONSTRAINT [fk_queueclassid]
GO
