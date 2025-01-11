-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2023 at 11:15 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aga_fun`
--

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`id`, `title`, `image`, `status`, `type`, `description`, `duration`, `created_at`, `updated_at`) VALUES
(1, 'Mes amis', 'cards/Q0ADmSKoYC.jpeg', 2, '0', 'Card pour tester les amis', '2', '2023-07-04 13:38:50', '2023-07-04 13:38:50'),
(2, 'Couple', 'cards/MMrZGpZIJG.jpeg', 2, '0', 'Carde de couple action', '1', '2023-07-04 15:23:41', '2023-07-04 15:23:41'),
(3, 'Famille conjoint je suis pas trop de temps à partir du numéro', 'cards/iwkQzHe3sr.png', 2, '1', 'Carde de famille action jusqu\'à la date de début d\'année pour vous dire tu peux le y en avait et u iy pour la semaine du t dit qu\'il ne soit Y A je suis pas y aller et venir 2 y avait un trip en y réfléchissant à vous et votre', '1', '2023-07-04 15:24:20', '2023-07-20 18:13:42'),
(4, 'Test', 'cards/9B7LwxvSpX.jpeg', 2, '2', 'Card verité', '3', '2023-07-20 17:58:43', '2023-07-20 17:58:43'),
(5, 'Test', 'cards/K7aCbcDDSF.jpeg', 2, '2', 'Card verité', '3', '2023-07-20 17:58:59', '2023-07-20 17:58:59'),
(6, 'Test', 'cards/edm8evclH8.jpeg', 2, '2', 'Card verité', '3', '2023-07-20 17:59:41', '2023-07-20 18:00:05'),
(7, 'Hhhhh', 'cards/AEX5pU6b19.jpeg', 2, '0', 'Hhhh', '3', '2023-07-22 14:33:39', '2023-07-22 14:33:39');

-- --------------------------------------------------------

--
-- Table structure for table `card_tags`
--

CREATE TABLE `card_tags` (
  `card_id` bigint(20) UNSIGNED NOT NULL,
  `tag_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `card_tags`
--

INSERT INTO `card_tags` (`card_id`, `tag_id`) VALUES
(1, 2),
(2, 1),
(2, 3),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(6, 2),
(7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `card_id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED DEFAULT NULL,
  `body` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `card_id`, `group_id`, `body`, `created_at`, `updated_at`) VALUES
(1, 26, 1, 1, 'Bonjour tout le monde !', '2023-07-04 13:54:55', '2023-07-04 13:54:55'),
(3, 29, 1, 1, 'Test message de Omar', '2023-07-04 15:26:06', '2023-07-04 15:26:06'),
(4, 30, 1, 1, 'Test message test test', '2023-07-04 15:29:49', '2023-07-04 15:29:49'),
(5, 29, 3, 2, 'Hfkkfjnd. Fododjjd diejdjdb disjdllf jslslldnf dkdlldndbjd jodndndndndk kdodnbdjdk jdkfnfnrn kdkdbfnodkr', '2023-07-04 15:37:31', '2023-07-04 15:37:31'),
(6, 30, 3, 2, 'Süper commentaires', '2023-07-04 15:39:08', '2023-07-04 15:39:08'),
(7, 29, 3, 3, 'jdjdj2jfjfjaaa@yahoo.comnxnnm jdjdj2jfjfjaaa@yahoo.comnxnnm', '2023-07-05 22:11:25', '2023-07-05 22:11:25'),
(8, 35, 1, 7, 'Fghjjb', '2023-07-22 14:37:20', '2023-07-22 14:37:20'),
(9, 36, 1, 7, 'Jkiiohhh', '2023-07-22 14:40:19', '2023-07-22 14:40:19');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creator_id` bigint(20) UNSIGNED NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_paused` tinyint(4) NOT NULL DEFAULT 0,
  `tasks_frequency` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `creator_id`, `description`, `is_paused`, `tasks_frequency`, `created_at`, `updated_at`) VALUES
(1, 'Google', 26, 'Groupe pour regrouper les comptes google', 0, 2, '2023-07-04 13:18:21', '2023-07-04 13:18:21'),
(2, 'Super groupe omar', 29, 'Tu dois faire des super choses', 0, 1, '2023-07-04 15:32:22', '2023-07-04 15:32:22'),
(3, '2eme famille', 29, '2eme famille', 0, 1, '2023-07-04 15:46:14', '2023-07-04 15:46:14'),
(6, 'Test grp', 1, 'Grp defi', 0, 2, '2023-07-21 11:28:50', '2023-07-21 11:29:07'),
(7, 'Equipe', 35, 'Juioo', 0, 5, '2023-07-22 14:20:18', '2023-07-22 14:20:18');

-- --------------------------------------------------------

--
-- Table structure for table `group_cards`
--

CREATE TABLE `group_cards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `card_id` bigint(20) UNSIGNED NOT NULL,
  `state` tinyint(4) NOT NULL DEFAULT 0,
  `frequency` int(11) NOT NULL DEFAULT 0,
  `custom_description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignement_date` datetime DEFAULT NULL,
  `shift_date` datetime DEFAULT NULL,
  `card_created_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_cards`
--

INSERT INTO `group_cards` (`id`, `group_id`, `card_id`, `state`, `frequency`, `custom_description`, `assignement_date`, `shift_date`, `card_created_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 50, 2, 'On va tester tout ici', '2023-07-04 13:53:47', NULL, '2023-07-04 13:38:50', '2023-07-04 13:38:50', '2023-07-04 13:38:50'),
(2, 2, 3, 50, 1, 'test custom super action jusqu\'à où on peut écrire si texte jzjsjss sudusis djejsd', '2023-07-04 15:35:20', NULL, '2023-07-04 15:24:20', '2023-07-20 18:13:42', '2023-07-20 18:13:42'),
(3, 3, 2, 50, 1, NULL, '2023-07-17 18:55:43', NULL, '2023-07-04 15:23:41', '2023-07-04 15:46:14', '2023-07-04 15:46:14'),
(4, 3, 3, 60, 1, NULL, '2023-07-05 15:21:45', NULL, '2023-07-04 15:24:20', '2023-07-20 18:13:42', '2023-07-20 18:13:42'),
(6, 2, 4, 0, 1, NULL, NULL, NULL, '2023-07-20 17:58:43', '2023-07-20 17:58:43', '2023-07-20 17:58:43'),
(7, 3, 4, 0, 1, NULL, NULL, NULL, '2023-07-20 17:58:43', '2023-07-20 17:58:43', '2023-07-20 17:58:43'),
(8, 2, 5, 0, 1, NULL, NULL, NULL, '2023-07-20 17:58:59', '2023-07-20 17:58:59', '2023-07-20 17:58:59'),
(9, 3, 5, 0, 1, NULL, NULL, NULL, '2023-07-20 17:58:59', '2023-07-20 17:58:59', '2023-07-20 17:58:59'),
(10, 2, 6, 20, 1, NULL, '2023-07-22 15:34:25', NULL, '2023-07-20 17:59:41', '2023-07-20 18:00:05', '2023-07-20 18:00:05'),
(11, 3, 6, 20, 1, NULL, '2023-07-22 15:34:25', NULL, '2023-07-20 17:59:41', '2023-07-20 18:00:06', '2023-07-20 18:00:06'),
(12, 1, 6, 0, 2, NULL, NULL, NULL, '2023-07-20 17:59:41', '2023-07-20 18:00:06', '2023-07-20 18:00:06'),
(13, 6, 1, 0, 2, NULL, NULL, NULL, '2023-07-04 14:38:50', '2023-07-21 11:29:07', '2023-07-21 11:29:07'),
(14, 6, 2, 0, 2, NULL, NULL, NULL, '2023-07-04 16:23:41', '2023-07-21 11:29:07', '2023-07-21 11:29:07'),
(15, 6, 3, 0, 2, NULL, NULL, NULL, '2023-07-04 16:24:20', '2023-07-21 11:29:07', '2023-07-21 11:29:07'),
(16, 6, 4, 0, 2, NULL, NULL, NULL, '2023-07-20 18:58:43', '2023-07-21 11:29:07', '2023-07-21 11:29:07'),
(17, 6, 5, 20, 2, NULL, '2023-07-22 15:34:25', NULL, '2023-07-20 18:58:59', '2023-07-21 11:29:07', '2023-07-21 11:29:07'),
(18, 6, 6, 0, 2, NULL, NULL, NULL, '2023-07-20 18:59:41', '2023-07-21 11:29:07', '2023-07-21 11:29:07'),
(19, 6, 6, 0, 2, NULL, NULL, NULL, '2023-07-20 18:59:41', '2023-07-21 11:29:07', '2023-07-21 11:29:07'),
(20, 7, 1, 50, 5, 'fghjjhjkk', '2023-07-22 15:34:25', NULL, '2023-07-04 14:38:50', '2023-07-22 14:20:18', '2023-07-22 14:20:18'),
(21, 7, 6, 0, 5, NULL, NULL, NULL, '2023-07-20 18:59:41', '2023-07-22 14:20:18', '2023-07-22 14:20:18'),
(22, 1, 7, 0, 2, NULL, NULL, NULL, '2023-07-22 15:33:39', '2023-07-22 14:33:39', '2023-07-22 14:33:39'),
(23, 6, 7, 0, 2, NULL, NULL, NULL, '2023-07-22 15:33:39', '2023-07-22 14:33:39', '2023-07-22 14:33:39'),
(24, 7, 7, 0, 5, NULL, NULL, NULL, '2023-07-22 15:33:39', '2023-07-22 14:33:39', '2023-07-22 14:33:39');

-- --------------------------------------------------------

--
-- Table structure for table `group_tags`
--

CREATE TABLE `group_tags` (
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `tag_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_tags`
--

INSERT INTO `group_tags` (`group_id`, `tag_id`) VALUES
(1, 2),
(2, 1),
(3, 1),
(6, 1),
(6, 2),
(7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `group_types`
--

CREATE TABLE `group_types` (
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `type_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_types`
--

INSERT INTO `group_types` (`group_id`, `type_id`) VALUES
(1, 2),
(1, 3),
(2, 2),
(2, 3),
(3, 1),
(6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `card_id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `card_id`, `group_id`, `user_id`, `image`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 26, 'cards/images/MpSJEBhuAi.jpeg', '2023-07-04 13:55:37', '2023-07-04 13:55:37'),
(4, 1, 1, 29, 'cards/images/ttFNLrhqCP.jpeg', '2023-07-04 15:26:42', '2023-07-04 15:26:42'),
(5, 1, 1, 30, 'cards/images/mZLXJN8kPF.png', '2023-07-04 15:30:07', '2023-07-04 15:30:07'),
(6, 3, 2, 29, 'cards/images/ztxUIlhNvo.jpeg', '2023-07-04 15:37:54', '2023-07-04 15:37:54'),
(7, 3, 2, 30, 'cards/images/LAv9Mc5vqS.jpeg', '2023-07-04 15:39:22', '2023-07-04 15:39:22'),
(8, 1, 7, 35, 'cards/images/xh3LzC9rny.jpeg', '2023-07-22 14:37:35', '2023-07-22 14:37:35'),
(9, 1, 7, 35, 'cards/images/x2UfbWZp1t.jpeg', '2023-07-22 14:38:03', '2023-07-22 14:38:03');

-- --------------------------------------------------------

--
-- Table structure for table `invitations`
--

CREATE TABLE `invitations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `group_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_05_11_184550_create_tags_table', 1),
(6, '2023_05_13_223907_create_groups_table', 1),
(7, '2023_05_13_224458_create_user_groups_pivot_table', 1),
(8, '2023_05_13_224521_create_group_tags_pivot_table', 1),
(9, '2023_05_13_232420_add_description_to_groups_table', 1),
(10, '2023_05_14_113120_add_is_paused_to_groups_table', 1),
(11, '2023_05_15_190240_add_is_admin_to_users_table', 1),
(12, '2023_05_15_191911_add_creator_to_groups_table', 1),
(13, '2023_05_18_175205_add_type_to_users_table', 1),
(14, '2023_06_09_121314_create_cards_table', 1),
(15, '2023_06_09_144521_create_card_tags_pivot_table', 1),
(16, '2023_06_09_163526_add_type_to_cards_table', 1),
(17, '2023_06_10_122035_add_status_to_cards_table', 1),
(18, '2023_06_11_202110_create_comments_table', 1),
(19, '2023_06_16_172519_create_images_table', 1),
(20, '2023_06_22_175536_group_cards', 1),
(21, '2023_06_22_204439_add_group_frequency_to_group_cards_table', 1),
(22, '2023_06_22_205230_add_assignement_date_to_group_cards_table', 1),
(23, '2023_06_23_040358_add_card_created_at_to_group_cards_table', 1),
(24, '2023_06_29_133203_add_group_id_to_comments_and_images_table', 1),
(25, '2023_06_29_212551_add_custom_description_to_group_cards_table', 1),
(26, '2023_06_30_114459_create_reviews_table', 1),
(27, '2023_06_30_183629_add_user_id_to_images_table', 1),
(28, '2023_06_30_213005_create_user_group_reviews_table', 1),
(31, '2023_07_20_185725_create_types_table', 2),
(32, '2023_07_20_190440_create_group_types_pivot_table', 2),
(34, '2023_07_21_125249_create_table_invitations', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '307ad2c79f7b082116bd08e05983f5f3c908c8ef57119e0f0f300e3b92216a48', '[\"*\"]', NULL, NULL, '2023-07-04 13:09:43', '2023-07-04 13:09:43'),
(2, 'App\\Models\\User', 27, 'auth_token', 'b18421d4b2caa868e19b157eaa97b57808f36daccdd14940263d10df7855e5c9', '[\"*\"]', NULL, NULL, '2023-07-04 13:33:23', '2023-07-04 13:33:23'),
(3, 'App\\Models\\User', 27, 'auth_token', '3f2c36018ee789d45b2a46ba6123efd156f217b8753e0422c235a8450988aa7c', '[\"*\"]', NULL, NULL, '2023-07-04 13:35:46', '2023-07-04 13:35:46'),
(4, 'App\\Models\\User', 1, 'auth_token', '83981395f905d555404ac63714e66531028039273059b43e9fab1a9a0498458a', '[\"*\"]', NULL, NULL, '2023-07-04 13:37:01', '2023-07-04 13:37:01'),
(5, 'App\\Models\\User', 27, 'auth_token', '505dba6a4266e9de5be5c6eb3e63d41756bd8327463a27d2917b5def78ccb5eb', '[\"*\"]', NULL, NULL, '2023-07-04 13:47:01', '2023-07-04 13:47:01'),
(6, 'App\\Models\\User', 27, 'auth_token', 'dfb14be36b9cbcc2c1152173b09b1e39dc075afa957d10ce246f0bc7f3e870a5', '[\"*\"]', NULL, NULL, '2023-07-04 13:47:13', '2023-07-04 13:47:13'),
(7, 'App\\Models\\User', 28, 'auth_token', 'ef57a335f0dc2ad9fef51a053e53c07ba31fe0038ecd4d007fff02850094161b', '[\"*\"]', NULL, NULL, '2023-07-04 13:50:50', '2023-07-04 13:50:50'),
(8, 'App\\Models\\User', 1, 'auth_token', '71b63d94a5110720a494679ef6427b55d6175a23796fb9e0c156a85e3ffd8a7e', '[\"*\"]', NULL, NULL, '2023-07-04 13:52:09', '2023-07-04 13:52:09'),
(9, 'App\\Models\\User', 27, 'auth_token', '9e58a30af0c20503c9f9611cdeea8cec83d1dd0111e5767cfcd9b0d3267e8db2', '[\"*\"]', NULL, NULL, '2023-07-04 13:53:55', '2023-07-04 13:53:55'),
(10, 'App\\Models\\User', 28, 'auth_token', '6ae0ad558e06e62a6ea43b9ef4c6feddef560f8c6c6172b6b24b95159c686deb', '[\"*\"]', NULL, NULL, '2023-07-04 13:58:35', '2023-07-04 13:58:35'),
(11, 'App\\Models\\User', 29, 'auth_token', '00d62440ccc619cc8462a28ecdaa86b6e04d8492832ecdab919a777137d30a93', '[\"*\"]', NULL, NULL, '2023-07-04 15:19:22', '2023-07-04 15:19:22'),
(12, 'App\\Models\\User', 30, 'auth_token', '48b48fff72a8f00619ecf7dad5f04f40355cd919eedf7797a37aca8a3c734d02', '[\"*\"]', NULL, NULL, '2023-07-04 15:21:54', '2023-07-04 15:21:54'),
(13, 'App\\Models\\User', 1, 'auth_token', '4a6b4423b6ff2841b6feb455b96127f5d4d985109ba11d2613b93bdadf497779', '[\"*\"]', NULL, NULL, '2023-07-04 15:22:23', '2023-07-04 15:22:23'),
(14, 'App\\Models\\User', 29, 'auth_token', 'cade02c5ae0d8895830b0e67b02652132d745e00397248eef2fc3fd9ecd35e74', '[\"*\"]', NULL, NULL, '2023-07-04 15:25:07', '2023-07-04 15:25:07'),
(15, 'App\\Models\\User', 30, 'auth_token', '85e3e8c8b6e06583a64cb2d828cd1953b1b7ca53ed87d0ae2535783c33f9ac7a', '[\"*\"]', NULL, NULL, '2023-07-04 15:28:20', '2023-07-04 15:28:20'),
(16, 'App\\Models\\User', 30, 'auth_token', '9f440f00162a35e46014a33c2e1b44f61c931700aa28b6f1af5158484ed2d5b4', '[\"*\"]', NULL, NULL, '2023-07-04 15:29:17', '2023-07-04 15:29:17'),
(17, 'App\\Models\\User', 29, 'auth_token', '5712edb37b21514c8cfa0eb25ab4f710117f40f0dfe8683311ec3a5823d39bf8', '[\"*\"]', NULL, NULL, '2023-07-04 15:31:34', '2023-07-04 15:31:34'),
(18, 'App\\Models\\User', 30, 'auth_token', 'ace204b94937ad55aa764174eca7640aea49bb4aa1d232c7d089011944d6fe7a', '[\"*\"]', NULL, NULL, '2023-07-04 15:33:40', '2023-07-04 15:33:40'),
(19, 'App\\Models\\User', 30, 'auth_token', '55a74dcfae90b29e5604e747360a915b3053c53c78c99df6c85055904e432537', '[\"*\"]', NULL, NULL, '2023-07-04 15:34:46', '2023-07-04 15:34:46'),
(20, 'App\\Models\\User', 1, 'auth_token', 'a8db6358057f791a11f1546ed5eec8e76a0485a40bd71059618b3f39b4b73fff', '[\"*\"]', NULL, NULL, '2023-07-04 15:35:15', '2023-07-04 15:35:15'),
(21, 'App\\Models\\User', 1, 'auth_token', 'd80cdc2532dd05a589c53e7610eac214992f176661eb8c6fad91e893cbda98ae', '[\"*\"]', NULL, NULL, '2023-07-04 15:35:34', '2023-07-04 15:35:34'),
(22, 'App\\Models\\User', 29, 'auth_token', 'c1664bbcda3559cbbde7d966774a52dc0f65ca019445e273d3bd57b69c393380', '[\"*\"]', NULL, NULL, '2023-07-04 15:36:18', '2023-07-04 15:36:18'),
(23, 'App\\Models\\User', 30, 'auth_token', 'bdbb5b438c8df6a95681bc817b526c52518e6ac081aaa8a26dc6aae90cb82bb6', '[\"*\"]', NULL, NULL, '2023-07-04 15:38:39', '2023-07-04 15:38:39'),
(24, 'App\\Models\\User', 29, 'auth_token', 'ad724090b1465d8c2872752d04d65db61cb5f7c3b798cd0a0a20649f195c09dd', '[\"*\"]', NULL, NULL, '2023-07-04 15:39:57', '2023-07-04 15:39:57'),
(25, 'App\\Models\\User', 1, 'auth_token', '8245f8e9a61ccb68c4b1a1d120b74fcb326e576ba75324ae06c20f33b2e92797', '[\"*\"]', NULL, NULL, '2023-07-04 15:40:37', '2023-07-04 15:40:37'),
(26, 'App\\Models\\User', 29, 'auth_token', 'b931a4b666a316c296d3125e2ec2821e3d361e39bce980791dea6cee59715d8f', '[\"*\"]', NULL, NULL, '2023-07-04 15:41:43', '2023-07-04 15:41:43'),
(27, 'App\\Models\\User', 1, 'auth_token', 'f3978009e11f122bbf7edf7759db2e841e75d328f23b15cd8e192dd619827c2d', '[\"*\"]', NULL, NULL, '2023-07-04 15:46:45', '2023-07-04 15:46:45'),
(28, 'App\\Models\\User', 29, 'auth_token', 'f10c7081106eecb3795b6a860d867a9570e7c18b55feb40c628c9be72ca61907', '[\"*\"]', NULL, NULL, '2023-07-04 15:47:03', '2023-07-04 15:47:03'),
(29, 'App\\Models\\User', 1, 'auth_token', 'ea971ca9f36bfc93a5dc4c9aad477ac95aa30590263763e1207e2b77c3668ff4', '[\"*\"]', NULL, NULL, '2023-07-04 15:48:29', '2023-07-04 15:48:29'),
(30, 'App\\Models\\User', 29, 'auth_token', '6647deae2e129bfb1f5c63d7b5293d9d264be032ae3595ad720db8b9d8045cea', '[\"*\"]', NULL, NULL, '2023-07-04 15:51:27', '2023-07-04 15:51:27'),
(31, 'App\\Models\\User', 1, 'auth_token', '0035516f7c42ade58f5ae042d84bcddba63fd2ae7f7ff5bb6d4888f4f84dcf81', '[\"*\"]', NULL, NULL, '2023-07-04 17:34:12', '2023-07-04 17:34:12'),
(32, 'App\\Models\\User', 29, 'auth_token', '8bc494b21cbafe52637e22767d1cf2761d029630156bc4be44877c672364135e', '[\"*\"]', NULL, NULL, '2023-07-04 17:34:25', '2023-07-04 17:34:25'),
(33, 'App\\Models\\User', 29, 'auth_token', '062bd7b7265fd527f7e9be10a8cde473fbd7991b3efbabf17b87c8e76f4bc17e', '[\"*\"]', NULL, NULL, '2023-07-05 11:31:21', '2023-07-05 11:31:21'),
(34, 'App\\Models\\User', 1, 'auth_token', '2aced9a774516f8def82acf8779056e909bb79a1f83b4088844b89ed22b3cd63', '[\"*\"]', NULL, NULL, '2023-07-05 15:21:14', '2023-07-05 15:21:14'),
(35, 'App\\Models\\User', 29, 'auth_token', 'fc3fb501c595c153c0e0835b53719aca4fd300a03264d8580c37e67342f7a10f', '[\"*\"]', NULL, NULL, '2023-07-05 15:23:26', '2023-07-05 15:23:26'),
(36, 'App\\Models\\User', 1, 'auth_token', '958bc2b215eb3202951b143b8bb59c43adb467867106fa856bb09ed1b28844c1', '[\"*\"]', NULL, NULL, '2023-07-05 22:09:25', '2023-07-05 22:09:25'),
(37, 'App\\Models\\User', 29, 'auth_token', 'cbebee317ab6b1ad7597444965e539bcd4d87482e9b82df278bf7b968f61a547', '[\"*\"]', NULL, NULL, '2023-07-05 22:10:50', '2023-07-05 22:10:50'),
(38, 'App\\Models\\User', 27, 'auth_token', '7ee8fe1250e2e2aa02a17966f8a12ab888619bbea5877e19a4581b308f041856', '[\"*\"]', NULL, NULL, '2023-07-06 19:11:13', '2023-07-06 19:11:13'),
(39, 'App\\Models\\User', 1, 'auth_token', '525492731ee0aa0ea15a8d70667e9b84e7462a1351aa3c7febfbf85a653e88ef', '[\"*\"]', NULL, NULL, '2023-07-17 18:55:29', '2023-07-17 18:55:29'),
(40, 'App\\Models\\User', 27, 'auth_token', 'abf01b45fdfb53a00aa339694df42b3d0f5fc2f94fc3f5c4dc62c9dc9ce61545', '[\"*\"]', NULL, NULL, '2023-07-17 20:09:21', '2023-07-17 20:09:21'),
(41, 'App\\Models\\User', 27, 'auth_token', 'f2593b7c59f18fde95ec430dd073f99aa9a6231ec75c6fec872405fb35e3d8e8', '[\"*\"]', NULL, NULL, '2023-07-17 20:49:28', '2023-07-17 20:49:28'),
(42, 'App\\Models\\User', 27, 'auth_token', 'c8cfd620999736ae93b2b42cbcae54b5592a95b69a129c96d0746e86dc83a80e', '[\"*\"]', NULL, NULL, '2023-07-17 22:47:51', '2023-07-17 22:47:51'),
(43, 'App\\Models\\User', 27, 'auth_token', 'fbeca5f340442d1e65cfbbce178e8af528a8df9550438e8f4c689d0c5e64f020', '[\"*\"]', NULL, NULL, '2023-07-18 13:06:11', '2023-07-18 13:06:11'),
(44, 'App\\Models\\User', 27, 'auth_token', 'b6745ed982cc810195d2662f125c2772710af488c38a1fd20888c0702c75f62b', '[\"*\"]', NULL, NULL, '2023-07-20 17:45:09', '2023-07-20 17:45:09'),
(45, 'App\\Models\\User', 1, 'auth_token', '3806793366391510c637b16df7b43547b113a3ad9d4f07e1be940d8af90bf619', '[\"*\"]', NULL, NULL, '2023-07-20 17:45:34', '2023-07-20 17:45:34'),
(46, 'App\\Models\\User', 29, 'auth_token', '4032e2bdac4c8cb26375384b39650aff2538f1d97e9e341834bf15a022d10964', '[\"*\"]', NULL, NULL, '2023-07-20 18:18:48', '2023-07-20 18:18:48'),
(47, 'App\\Models\\User', 1, 'auth_token', 'e1591b5a9ca24d0f728095cb1981d454ae525ae11013b77d7b2e710e1bb11438', '[\"*\"]', NULL, NULL, '2023-07-21 11:26:18', '2023-07-21 11:26:18'),
(48, 'App\\Models\\User', 32, 'auth_token', 'c946bb3ace7211ef522765b8c6f9d115d0540263b7e951eb2cd5822bda1d9665', '[\"*\"]', NULL, NULL, '2023-07-22 11:47:57', '2023-07-22 11:47:57'),
(49, 'App\\Models\\User', 32, 'auth_token', '87f35f21f91efbbcf4a16464f735cf1417ac6b2640fa143e9051ee2b59512a53', '[\"*\"]', NULL, NULL, '2023-07-22 11:57:53', '2023-07-22 11:57:53'),
(50, 'App\\Models\\User', 1, 'auth_token', '8f1c551d1367895ad3c547815f63914ba1370428c5922b4cc294d2649fca1a14', '[\"*\"]', NULL, NULL, '2023-07-22 12:03:25', '2023-07-22 12:03:25'),
(51, 'App\\Models\\User', 33, 'auth_token', 'f67535d398fe1ab8a16247f456714c56b34e2093e5344969d1eb37bea9350f40', '[\"*\"]', NULL, NULL, '2023-07-22 12:05:17', '2023-07-22 12:05:17'),
(52, 'App\\Models\\User', 1, 'auth_token', '97bf3070c264891fc6fb7a3c8f9d71f913561187c555df3b00d2dda8bbf021ba', '[\"*\"]', NULL, NULL, '2023-07-22 12:09:20', '2023-07-22 12:09:20'),
(53, 'App\\Models\\User', 34, 'auth_token', '00b6b2f97ccd6c8f2adb3e8e7cbb7072d34e337251dfbbd1a96667930135eb07', '[\"*\"]', NULL, NULL, '2023-07-22 12:10:33', '2023-07-22 12:10:33'),
(54, 'App\\Models\\User', 32, 'auth_token', '41353edbaf63566f0ba2e3f2f9487aaa07e2f55c4ffa5acf64db0610378d36d4', '[\"*\"]', NULL, NULL, '2023-07-22 12:16:09', '2023-07-22 12:16:09'),
(55, 'App\\Models\\User', 35, 'auth_token', 'a51e7d230b8a6de8b9a9adc3cda1962bd557fa61fdd07359d9464bc4386c9ff9', '[\"*\"]', NULL, NULL, '2023-07-22 14:15:32', '2023-07-22 14:15:32'),
(56, 'App\\Models\\User', 35, 'auth_token', '0981e56c42414295e667630f564127b619d3495deb43c03097437aa08d3504af', '[\"*\"]', NULL, NULL, '2023-07-22 14:18:37', '2023-07-22 14:18:37'),
(57, 'App\\Models\\User', 36, 'auth_token', 'adad8581a7c42187b604a53f49a1a8d90cc40e7ec235f303e10e67e2155bf4b3', '[\"*\"]', NULL, NULL, '2023-07-22 14:23:26', '2023-07-22 14:23:26'),
(58, 'App\\Models\\User', 1, 'auth_token', '0faf7e3611d6f5822619636e6dfc97775919e7d050376f1fa0ca9b513e8200a0', '[\"*\"]', NULL, NULL, '2023-07-22 14:32:34', '2023-07-22 14:32:34'),
(59, 'App\\Models\\User', 35, 'auth_token', 'fa1e3d284e4ad9ed7173be5aa7dbe33b94a615d87f6dee56d493e330f8e63b2a', '[\"*\"]', NULL, NULL, '2023-07-22 14:36:00', '2023-07-22 14:36:00'),
(60, 'App\\Models\\User', 36, 'auth_token', 'd573640622f68c6077d0ea523604c4798ab5533309cc6bce3761e1e768dce461', '[\"*\"]', NULL, NULL, '2023-07-22 14:38:50', '2023-07-22 14:38:50'),
(61, 'App\\Models\\User', 35, 'auth_token', '29d498287fb9e4ee39316a5ce2a47a0b2f6fe57efd10a2063ae2d787fff84891', '[\"*\"]', NULL, NULL, '2023-07-22 14:41:05', '2023-07-22 14:41:05');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `card_id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `review` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `card_id`, `group_id`, `review`, `created_at`, `updated_at`) VALUES
(1, 26, 1, 1, 4, '2023-07-04 13:57:22', '2023-07-04 13:57:22'),
(3, 29, 1, 1, 1, '2023-07-04 15:26:53', '2023-07-04 15:26:53'),
(4, 30, 1, 1, 5, '2023-07-04 15:30:12', '2023-07-04 15:30:12'),
(5, 30, 3, 2, 2, '2023-07-04 15:39:33', '2023-07-04 15:39:33'),
(6, 29, 3, 3, 2, '2023-07-05 22:11:34', '2023-07-05 22:11:34'),
(8, 29, 3, 2, 5, '2023-07-17 18:44:57', '2023-07-17 18:44:57'),
(9, 35, 1, 7, 5, '2023-07-22 14:38:29', '2023-07-22 14:38:29'),
(10, 36, 1, 7, 4, '2023-07-22 14:40:32', '2023-07-22 14:40:32');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Famille', '2023-07-04 13:10:15', '2023-07-04 13:10:15'),
(2, 'Ami', '2023-07-04 13:17:27', '2023-07-04 13:17:27'),
(3, 'Couple', '2023-07-04 15:23:00', '2023-07-04 15:23:00');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Action', NULL, NULL),
(2, 'Défi', NULL, NULL),
(3, 'Vérité', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT 0,
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'basic',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `is_admin`, `picture`, `type`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'Aga FUN', 'agafun2023@gmail.com', 1, 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745', 'basic', '2023-06-22 17:43:36', '$2y$10$ZOxXpTjYfzp7h4BrNtkzouo09GwJdJzPro0TtjMgLISMW5V5atdAi', '8rGAHsF2W9', '2023-06-22 17:43:36', '2023-07-21 11:26:02'),
(26, 'Ahmed', 'Mestiri', 'ahmestiri21@gmail.com', 0, 'https://lh3.googleusercontent.com/a/AAcHTtfw9PJgl2oXpdanLaM38PP8PLMnxIzvXHXiIPFWh9h-eZE=s96-c', 'google', '2023-07-04 13:08:48', '$2y$10$7DmkgxzU1uF4oLAPjo1C2OsBjDJj3p.jtZsTB63AwJFu8XiftqRk6', NULL, '2023-07-04 13:08:48', '2023-07-04 13:08:48'),
(29, 'Omar', 'Arf', 'omararf@gmail.com', 0, 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745', 'basic', '2023-07-04 15:19:16', '$2y$10$k7D3aqbtiNscXbQ70IVF0eviiNSTn7p0.xxxWwh2zWZs9tuOpWr5e', NULL, '2023-07-04 15:18:50', '2023-07-04 15:19:15'),
(30, 'Test', 'Test', 'innorpievents@gmail.com', 0, 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745', 'basic', '2023-07-04 15:21:46', '$2y$10$va.dwhU1YW3pc0pEUa3DX.rH.tYwXmO96jJg070.ezLdy17BBfygW', NULL, '2023-07-04 15:21:22', '2023-07-04 15:21:45'),
(31, 'Roua', 'Rezgui', 'rouarezgui8@gmail.com', 0, 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745', 'basic', '2023-07-17 20:11:13', '$2y$10$6XIsxPcQPkYZUjrbv5gQ9uzAcYbLDo9fUmeYP5ssTG8kNDEdZv9uC', NULL, '2023-07-17 20:10:21', '2023-07-17 20:11:13'),
(32, 'Mestiri', 'Amal', 'amalmestiri524@gmail.com', 0, 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745', 'basic', '2023-07-22 11:47:49', '$2y$10$08Q5WMKprqf8J9NuRnufG.tl5UEBrUhqHNeVAJNj1VWOZPZtfSkHu', NULL, '2023-07-22 11:47:22', '2023-07-22 11:47:50'),
(34, 'Raze', 'Am', 'ahmed.mestiri@supcom.tn', 0, 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745', 'basic', '2023-07-22 12:10:25', '$2y$10$MMZh5Rvjkbi4y5jnoocAm.iT4riyaCNDMiauThLNacNeSrWD0yNVK', NULL, '2023-07-22 12:10:00', '2023-07-22 12:10:26'),
(35, 'Ahmed', 'Bacemmm', 'bacem.ahmed@supcom.tn', 0, 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745', 'basic', '2023-07-22 14:13:18', '$2y$10$Tr1.wdFWMfufzO4T9qg4h.tPZIGWhuF8DJ9mQSZM15TJKDNI93oFi', NULL, '2023-07-22 14:12:20', '2023-07-22 14:18:35'),
(36, 'Sadraoui', 'Imen', 'imen.sadraoui@supcom.tn', 0, 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745', 'basic', '2023-07-22 14:23:14', '$2y$10$oZ/e21MieSbbXScnY.K5WuEzyEDaMsYEzH6LUwsJypN.tOzcYE6fa', NULL, '2023-07-22 14:22:33', '2023-07-22 14:23:15');

-- --------------------------------------------------------

--
-- Table structure for table `user_groups`
--

CREATE TABLE `user_groups` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `is_validated` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_groups`
--

INSERT INTO `user_groups` (`user_id`, `group_id`, `is_validated`) VALUES
(26, 1, 1),
(29, 1, 1),
(30, 1, 1),
(29, 2, 1),
(30, 2, 1),
(29, 3, 1),
(1, 6, 1),
(26, 6, 1),
(32, 6, 1),
(34, 6, 1),
(35, 7, 1),
(36, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_group_reviews`
--

CREATE TABLE `user_group_reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `partner_id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `review` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_group_reviews`
--

INSERT INTO `user_group_reviews` (`id`, `user_id`, `partner_id`, `group_id`, `review`, `created_at`, `updated_at`) VALUES
(5, 29, 26, 1, 2, '2023-07-04 15:26:58', '2023-07-04 15:26:58'),
(8, 30, 26, 1, 1, '2023-07-04 15:30:19', '2023-07-04 15:30:19'),
(11, 30, 29, 1, 1, '2023-07-04 15:30:25', '2023-07-04 15:30:25'),
(12, 29, 30, 2, 5, '2023-07-04 15:38:02', '2023-07-04 15:38:02'),
(13, 30, 29, 2, 1, '2023-07-04 15:39:32', '2023-07-04 15:39:32'),
(14, 26, 29, 1, 5, '2023-07-04 16:54:28', '2023-07-04 16:54:28'),
(15, 26, 30, 1, 4, '2023-07-04 16:54:29', '2023-07-04 16:54:29'),
(16, 29, 30, 1, 5, '2023-07-05 11:45:31', '2023-07-05 11:45:31'),
(20, 35, 36, 7, 2, '2023-07-22 14:38:35', '2023-07-22 14:38:35'),
(21, 36, 35, 7, 5, '2023-07-22 14:40:39', '2023-07-22 14:40:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `card_tags`
--
ALTER TABLE `card_tags`
  ADD PRIMARY KEY (`card_id`,`tag_id`),
  ADD KEY `card_tags_card_id_index` (`card_id`),
  ADD KEY `card_tags_tag_id_index` (`tag_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_index` (`user_id`),
  ADD KEY `comments_card_id_index` (`card_id`),
  ADD KEY `comments_group_id_index` (`group_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups_creator_id_index` (`creator_id`);

--
-- Indexes for table `group_cards`
--
ALTER TABLE `group_cards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_cards_group_id_index` (`group_id`),
  ADD KEY `group_cards_card_id_index` (`card_id`);

--
-- Indexes for table `group_tags`
--
ALTER TABLE `group_tags`
  ADD PRIMARY KEY (`group_id`,`tag_id`),
  ADD KEY `group_tags_group_id_index` (`group_id`),
  ADD KEY `group_tags_tag_id_index` (`tag_id`);

--
-- Indexes for table `group_types`
--
ALTER TABLE `group_types`
  ADD PRIMARY KEY (`group_id`,`type_id`),
  ADD KEY `group_types_group_id_index` (`group_id`),
  ADD KEY `group_types_type_id_index` (`type_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `images_card_id_index` (`card_id`),
  ADD KEY `images_group_id_index` (`group_id`),
  ADD KEY `images_user_id_index` (`user_id`);

--
-- Indexes for table `invitations`
--
ALTER TABLE `invitations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invitations_group_id_foreign` (`group_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_user_id_index` (`user_id`),
  ADD KEY `reviews_card_id_index` (`card_id`),
  ADD KEY `reviews_group_id_index` (`group_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_groups`
--
ALTER TABLE `user_groups`
  ADD PRIMARY KEY (`group_id`,`user_id`),
  ADD KEY `user_groups_user_id_index` (`user_id`),
  ADD KEY `user_groups_group_id_index` (`group_id`);

--
-- Indexes for table `user_group_reviews`
--
ALTER TABLE `user_group_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_group_reviews_user_id_index` (`user_id`),
  ADD KEY `user_group_reviews_partner_id_index` (`partner_id`),
  ADD KEY `user_group_reviews_group_id_index` (`group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `group_cards`
--
ALTER TABLE `group_cards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `invitations`
--
ALTER TABLE `invitations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `user_group_reviews`
--
ALTER TABLE `user_group_reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `card_tags`
--
ALTER TABLE `card_tags`
  ADD CONSTRAINT `card_tags_card_id_foreign` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `card_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_card_id_foreign` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_creator_id_foreign` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_cards`
--
ALTER TABLE `group_cards`
  ADD CONSTRAINT `group_cards_card_id_foreign` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_cards_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_tags`
--
ALTER TABLE `group_tags`
  ADD CONSTRAINT `group_tags_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_types`
--
ALTER TABLE `group_types`
  ADD CONSTRAINT `group_types_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_types_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_card_id_foreign` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `images_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `images_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invitations`
--
ALTER TABLE `invitations`
  ADD CONSTRAINT `invitations_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_card_id_foreign` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_groups`
--
ALTER TABLE `user_groups`
  ADD CONSTRAINT `user_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_group_reviews`
--
ALTER TABLE `user_group_reviews`
  ADD CONSTRAINT `user_group_reviews_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_group_reviews_partner_id_foreign` FOREIGN KEY (`partner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_group_reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
